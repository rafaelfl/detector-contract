export const vulnerabilitiesAffectSameLines = (range1: Array<number>, range2: Array<number>) => {
  const rangeObj1 = {
    start: range1?.[0] ?? 0,
    end: range1?.[range1?.length - 1] ?? 0,
  };

  const rangeObj2 = {
    start: range2?.[0] ?? 0,
    end: range2?.[range2?.length - 1] ?? 0,
  };

  if (!Array.isArray(range1) || !Array.isArray(range2)) {
    return false;
  }

  if (range1.length === 1) {
    rangeObj1.end = rangeObj1.start;
  }

  if (range2.length === 1) {
    rangeObj2.end = rangeObj2.start;
  }

  return (
    (rangeObj1.start <= rangeObj2.end && rangeObj2.start <= rangeObj1.end) ||
    (rangeObj2.start <= rangeObj1.end && rangeObj1.start <= rangeObj2.end)
  );
};
