// components/charts/PieChart.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { G, Path } from "react-native-svg";

import { ChartColors, Colors } from "../../constants/style";
import { formatNumberWithCommas } from "../../utils/helper";

const PieChart = ({ data, total, title, growth }) => {
  const size = 280;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const GAP = 10;

  // Format growth value for display
  let growthText = "";
  let growthColor = Colors.border;

  if (typeof growth === "number") {
    if (growth > 0) {
      growthText = `▲ ₪${formatNumberWithCommas(growth)}`;
      growthColor = Colors.success500;
    } else if (growth < 0) {
      growthText = `▼ ₪${formatNumberWithCommas(growth)}`;
      growthColor = Colors.error500;
    } else {
      growthText = "0";
      growthColor = "#999";
    }
  }

  // ---- Sanitize & group < 10% into "Other" ----
  const sanitizedData = data.map((item) => ({
    label: item.label,
    value: Number(item.value) || 0,
  }));

  const rawTotal = sanitizedData.reduce((sum, item) => sum + item.value, 0) || 1;

  const bigSlices = [];
  let otherValue = 0;
  const otherLabels = [];

  sanitizedData.forEach((item) => {
    const percentage = (item.value / rawTotal) * 100;
    if (percentage < 10) {
      otherValue += item.value;
      otherLabels.push(item.label);
    } else {
      bigSlices.push(item);
    }
  });

  if (otherValue > 0) {
    bigSlices.push({
      label: "אחר",
      value: otherValue,
      otherLabels,
    });
  }

  // ---- Sort largest → smallest and attach colors ----
  const cleanData = bigSlices
    .sort((a, b) => b.value - a.value)
    .map((item, index) => ({
      ...item,
      color: ChartColors[index % ChartColors.length],
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

  // ---- Trim arcs to create visual gaps (even for tiny slices) ----
  const trimArc = (start, end, gapDeg) => {
    const sliceSize = end - start;
    if (sliceSize <= 0) return { start, end };

    // Never trim more than a quarter of a tiny slice on each side,
    // so even small segments keep a visible arc but still show a gap.
    const maxHalfGapBySize = sliceSize / 4;
    const halfGap = Math.min(gapDeg / 2, maxHalfGapBySize);

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
        <Text style={styles.amount}>₪{formatNumberWithCommas(total)}</Text>
        {growth !== null && growthText !== "" && (
          <Text style={[styles.growth, { color: growthColor }]}>
            {growthText}
          </Text>
        )}
      </View>

      {/* Sorted Legend */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.legendContainer}
      >
        {cleanData.map((item, i) => {
          const percentage = ((item.value / totalValue) * 100).toFixed(2);
          const otherDetails =
            item.otherLabels && item.otherLabels.length > 0
              ? ` (${item.otherLabels.join(", ")})`
              : "";

          return (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.label}
                {otherDetails} {percentage}%
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
  growth: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  legendContainer: {
    flexDirection: "row",
    marginTop: 32,
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
