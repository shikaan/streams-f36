export default async function*s (stream: ReadableStream) {
  const reader = stream.getReader();

  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
