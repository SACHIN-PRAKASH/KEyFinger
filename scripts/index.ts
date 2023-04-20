import { Repo, RepoFile, repoOptions } from "./data";
import { clearEditor, EditorResult, startEditor } from "./editor";
import {
	chooseOption,
	clearTerminal,
	readLine,
	removeTerminalCursor,
	separatorLine,
	writeLines,
} from "./terminal";

const getRoundLine = (round: number, wantsToPlayAgain: boolean) => {
	if (round === 1) return "Welcome to Key Finger!";
	if (wantsToPlayAgain) return "Yay! Let's Type again! :)";
	return "HAHA!, I'm just gonna let you Type again! :)";
};

const writeFileHeader = async (repo: Repo, file: RepoFile) => {
	clearTerminal();
	const lines = [
		`${repo.label} it is!`,
		separatorLine,
		`Repo: ${repo.url}`,
		`File: ${file.path}`,
		" ",
		"When you are ready, show some skills!",
		separatorLine,
		" ",
	];
	await writeLines(lines);
};

const writeResult = async (result: EditorResult) => {
	const errors = result.totalCharacters - result.correctCharacters;
	const accuracy =
		result.totalCharacters > 0
			? (result.correctCharacters / result.totalCharacters) * 100
			: 0;
	const ccps = (result.correctCharacters / result.totalTime) * 1000 * 60;

	const lines = [
		result.reachedTheEnd
			? "Wow! you've Typed the entire snippet!"
			: "Oops! Time's up!",
		"Keep Going! Here are your results:",
		separatorLine,
		" ",
		`Correct characters per minute are: ${ccps.toFixed(2)}`,
		`Total errors are: ${errors > 0 ? errors : "No errors, what a performance! I'm Impressed!"}`,
		`Accuracy is: ${accuracy.toFixed(2)}%`,
		" ",
		separatorLine,
		"Wanna Type again? (y, n)",
		" ",
	];
	await writeLines(lines);
};

const runGame = async () => {
	let round = 1;
	let wantsToPlayAgain = true;

	while (true) {
		clearTerminal();
		await writeLines([
			getRoundLine(round, wantsToPlayAgain),
			"Please select your favorite:",
			" ",
		]);
		const repo = await chooseOption(repoOptions);
		const file = repo.files[Math.floor(Math.random() * repo.files.length)];
		await writeFileHeader(repo, file);
		removeTerminalCursor();

		const result = await startEditor(file.code);

		clearEditor();
		clearTerminal();
		await writeResult(result);

		wantsToPlayAgain = (await readLine()) === "y";
		round++;
	}
};

runGame();
