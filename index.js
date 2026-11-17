const candidates = [
    { role: "Продавець-касир", city: "Київ", bank: "Лівий", phone: "TEST-001" },
    { role: "Продавець", city: "Київ", bank: "Правий", phone: "TEST-002" },
    { role: "Продавець", city: "Київ", bank: "Лівий", phone: "" },
    { role: "Вантажник", city: "Київ", bank: "Лівий", phone: "TEST-003" }
];

const [role = "продавець", city = "Київ", bank = "Лівий"] = process.argv.slice(2);
const normalize = (value) => value.trim().toLowerCase();

const matches = candidates.filter((candidate) =>
    normalize(candidate.role).includes(normalize(role))
    && normalize(candidate.city) === normalize(city)
    && normalize(candidate.bank) === normalize(bank)
    && candidate.phone
);

console.table(matches);
console.log(`Знайдено кандидатів із контактом: ${matches.length}`);
