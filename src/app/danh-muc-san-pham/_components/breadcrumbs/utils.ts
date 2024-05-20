export function getPathOfCurrentSelectedGroup(
  productGroupsList: any[],
  groupId: string,
) {
  if (!groupId) {
    return [];
  }
  const currentLevel = productGroupsList?.find(
    (group: any) => group.id == groupId && group.name,
  );
  const parentLevel = productGroupsList?.find(
    (group: any) => group.id == currentLevel?.parent_id,
  );
  const grandParentLevel =
    parentLevel &&
    parentLevel?.parent_id &&
    productGroupsList?.find((group: any) => group.id == parentLevel?.parent_id);
  const path = [grandParentLevel, parentLevel, currentLevel];
  return path;
}
