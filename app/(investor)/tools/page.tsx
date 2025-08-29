"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyLeft } from "d3-sankey";

type NodeType = { id: number; name: string };
type LinkType = { source: number; target: number; value: number };

export default function TeslaSankey() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/financial/Tesla")
      .then((res) => res.json())
      .then((json) => {
        console.log("Fetched data:", json);
        setData(Array.isArray(json) ? json[0] : json);
      });
  }, []);

  useEffect(() => {
    if (!data) return;

    const width = 900;
    const height = 600;
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // Products flow into Total Revenue
    // Revenue flows into Cost of Revenue and Gross Profit
    // Gross Profit flows into Total Profit
    // Finally operating profit flows into Net profit

    const nodes: NodeType[] = [
      { id: 0, name: "Product Sales" },
      { id: 1, name: "Service Sales" },
      { id: 2, name: "Energy Sales" },
      { id: 3, name: "Total Revenue" },
      { id: 4, name: "Cost of Revenue" },
      { id: 5, name: "Gross Profit" },
      { id: 6, name: "Net Income" },
      { id: 7, name: "Operating Profit" },
      { id: 8, name: "Total Profit" },
    ];
    const links: LinkType[] = [
      { source: 0, target: 3, value: data.salesGoods },
      { source: 1, target: 3, value: data.salesServices },
      { source: 2, target: 3, value: data.salesEnergy },
      { source: 3, target: 4, value: data.costOfRevenue },
      { source: 3, target: 5, value: data.grossProfit },
      { source: 5, target: 6, value: data.netIncome },
      { source: 5, target: 7, value: data.grossProfit }, // Assuming operating profit is same as gross profit for simplicity
      { source: 7, target: 8, value: data.grossProfit }, // Assuming total profit is same as gross profit for simplicity
    ];

    const sankeyGen = sankey<NodeType, LinkType>()
      .nodeWidth(60)
      .nodePadding(20)
      .nodeAlign(sankeyLeft)
      .extent([
        [60, 60],
        [width - 50, height - 50],
      ]);

    const graph = sankeyGen({
      nodes: nodes.map((d) => ({ ...d })),
      links: links.map((d) => ({ ...d })),
    });

    // Define colors for each node
    const nodeColors: { [key: string]: string } = {
      "Product Sales": "#0ea5e9", // sky-500
      "Service Sales": "#ec4899", // fuchsia-500
      "Energy Sales": "#f59e0b", // amber-500
      "Total Revenue": "#8b5cf6", // violet-500
      "Cost of Revenue": "#ef4444", // red-500
      "Gross Profit": "#10b981", // emerald-500
    };

    // Create gradients for links
    const defs = svg.append("defs");

    graph.links.forEach((link, i) => {
      const sourceNode = link.source as any;
      const targetNode = link.target as any;

      const gradient = defs
        .append("linearGradient")
        .attr("id", `gradient-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", sourceNode.x1 || 0)
        .attr("x2", targetNode.x0 || 0);

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", nodeColors[sourceNode.name] || "#64748b")
        .attr("stop-opacity", 0.6);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", nodeColors[targetNode.name] || "#64748b")
        .attr("stop-opacity", 0.6);
    });

    // Draw links
    svg
      .append("g")
      .selectAll("path")
      .data(graph.links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d, i) => `url(#gradient-${i})`)
      .attr("stroke-width", (d) => Math.max(10, d.width || 0))
      .attr("fill", "none")
      .attr("opacity", 0.8);

    // Draw nodes
    svg
      .append("g")
      .selectAll("rect")
      .data(graph.nodes)
      .join("rect")
      .attr("x", (d) => d.x0 || 0)
      .attr("y", (d) => d.y0 || 0)
      .attr("height", (d) => (d.y1 || 0) - (d.y0 || 0))
      .attr("width", (d) => (d.x1 || 0) - (d.x0 || 0))
      .attr("fill", (d) => nodeColors[d.name] || "#64748b")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2);

    // Add labels
    svg
      .append("g")
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .attr("x", (d) => {
        const nodeX = d.x0 || 0;
        const nodeWidth = (d.x1 || 0) - (d.x0 || 0);
        return nodeX < width / 2 ? (d.x1 || 0) + 10 : (d.x0 || 0) - 10;
      })
      .attr("y", (d) => ((d.y0 || 0) + (d.y1 || 0)) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => ((d.x0 || 0) < width / 2 ? "start" : "end"))
      .attr("fill", "#f8fafc")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .text((d) => d.name);

    // Add value labels on links
    svg
      .append("g")
      .selectAll("text")
      .data(graph.links)
      .join("text")
      .attr("x", (d) => {
        const sourceX = (d.source as any).x1 || 0;
        const targetX = (d.target as any).x0 || 0;
        return (sourceX + targetX) / 2;
      })
      .attr("y", (d) => {
        const sourceY = ((d.source as any).y0 || 0) + (d.y0 || 0) + ((d.y1 || 0) - (d.y0 || 0)) / 2;
        return sourceY;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("fill", "#f8fafc")
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .text((d) => `$${(d.value / 1000000).toFixed(1)}B`);
  }, [data]);

  return (
    <div className="p-6 bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">Tesla Revenue Flow</h1>
      <svg ref={svgRef} className="bg-gray-900"></svg>
    </div>
  );
}
