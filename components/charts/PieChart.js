// components/charts/PieChart.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { ChartColors, Colors } from "../../constants/style";

const PieChart = ({ data, total, title }) => {
  const size = 250;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const GAP = 12;

  // ---- Sanitize & sort largest → smallest ----
  const cleanData = data
    .map((item) => ({
      label: item.label,
      value: Number(item.value) || 0,
    }))
    .sort((a, b) => b.value - a.value) // largest → smallest
    .map((item, index) => ({
      ...item,
      color: ChartColors[index % ChartColors.length], // give color by size
    }));

  const totalValue = cleanData.reduce((sum, item) => sum + item.value, 0) || 1;

  // ---- Convert angle to cartesian coordinate ----
  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // ---- Trim arcs to create perfect visual gaps ----
  const trimArc = (start, end, gapDeg) => {
    const halfGap = gapDeg / 2;
    return {
      start: start + halfGap,
      end: end - halfGap,
    };
  };

  // ---- Build arcs ----
  const createArc = (startAngle, endAngle, color, key) => {
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    return (
      <Path
        key={key}
        d={`M ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  // ---- Build all segments with clean gaps ----
  let currentAngle = -90; // Start at top
  const segments = cleanData.map((item, index) => {
    const sliceAngle = (item.value / totalValue) * 360;

    const rawStart = currentAngle;
    const rawEnd = currentAngle + sliceAngle;

    const { start, end } = trimArc(rawStart, rawEnd, GAP);

    currentAngle = rawEnd; // shift to next arc without adding extra gap

    return createArc(start, end, item.color, index);
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G>{segments}</G>
      </Svg>

      {/* Center labels */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>₪{Number(total).toFixed(2)}</Text>
      </View>

      {/* Sorted Legend */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.legendContainer}
      >
        {cleanData.map((item, i) => {
          const percentage = ((item.value / totalValue) * 100).toFixed(0);

          return (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.label} {percentage}%
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  centerContent: {
    position: "absolute",
    top: 90,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#777",
  },
  amount: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 4,
  },
  legendContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 8,
    justifyContent: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
  },
});
