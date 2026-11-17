const sourceUrl = new URL(
    `/uk/resume/kiev/q=${encodeURIComponent("продавець+касир")}/`,
    "https://flagma.ua"
);

async function checkSource() {
    const response = await fetch(sourceUrl, {
        signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
        throw new Error(`Flagma повернула HTTP ${response.status}`);
    }

    const html = await response.text();
    const text = html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&(?:nbsp|thinsp|#160|#8239);/gi, " ")
        .replace(/\s+/g, " ");

    const result = text.match(
        /Резюме продавець касир в Києві\s+(\d[\d ]*)\s+резюме/iu
    );

    if (!result) {
        throw new Error("У відповіді Flagma не знайдено лічильник видачі.");
    }

    const count = Number(result[1].replace(/\s/g, ""));
    console.log(`Flagma: ${count} результатів за запитом «продавець касир, Київ».`);
}

checkSource().catch((error) => {
    console.error(`Помилка перевірки: ${error.message}`);
    process.exitCode = 1;
});
