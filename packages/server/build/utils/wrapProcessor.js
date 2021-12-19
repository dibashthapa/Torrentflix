export function wrapProcessor(processor) {
    async function wrappedProcessor(job, done) {
        const exitHandler = (exitCode) => {
            console.log(`Received SIGTERM for job id '${job.id}' with exit code '${exitCode}' and PID '${process.pid}'`);
            job.discard();
            process.exit(exitCode);
        };
        process.on("SIGTERM", exitHandler);
        try {
            await job.update({ ...job.data, pid: process.pid });
            const result = processor(job, done);
            console.log(job);
            return result;
        }
        finally {
            process.removeListener("SIGTERM", exitHandler);
        }
    }
    return wrappedProcessor;
}
//# sourceMappingURL=wrapProcessor.js.map