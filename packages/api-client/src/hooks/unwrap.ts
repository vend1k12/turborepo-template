// Better Auth client methods resolve to { data, error } instead of throwing.
// React Query wants a thrown error to mark a query/mutation as failed, so we
// normalize here.
export async function unwrap<T>(
  promise: Promise<{ data: T | null; error: { message?: string } | null }>,
): Promise<T> {
  const { data, error } = await promise;
  if (error) {
    throw new Error(error.message ?? "Request failed");
  }
  return data as T;
}
