function trim(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+ctx/g, '');
}
