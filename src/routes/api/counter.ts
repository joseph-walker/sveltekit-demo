import { readFile as readFileAsync, writeFile as writeFileAsync } from "fs";
import { promisify } from "util";

const readFile = promisify(readFileAsync);
const writeFile = promisify(writeFileAsync);

export async function get() {
	const count = await readFile("count.txt", { encoding: "utf-8" });

	return {
		status: 200,
		body: {
			count
		}
	}
}

export async function post(req) {
	const newCount = req.body.count || 0;

	await writeFile("count.txt", `${newCount}`, { encoding: "utf-8" })

	return {
		status: 200,
		body: {
			count: newCount
		}
	}
}
