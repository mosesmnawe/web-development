javascript
// ==========================================
// Starting Notes Data
// ==========================================

let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" }
];


// ==========================================
// 1. searchNotes(word)
// Returns notes containing the word,
// ignoring upper/lower case.
// ==========================================

function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(word.toLowerCase())
    );
}


// ==========================================
// 2. longestNote()
// Returns the note with the most characters.
// Returns null if there are no notes.
// ==========================================

function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    return notes.reduce((longest, note) =>
        note.text.length > longest.text.length ? note : longest
    );
}


// ==========================================
// 3. countByCategory()
// Counts notes by category.
// ==========================================

function countByCategory() {
    const counts = {};

    notes.forEach(note => {
        if (counts[note.category]) {
            counts[note.category]++;
        } else {
            counts[note.category] = 1;
        }
    });

    return counts;
}


// ==========================================
// 4. getSummary()
// Returns a sentence summarising the notes.
// ==========================================

function getSummary() {
    const counts = countByCategory();

    const personal = counts.personal || 0;
    const work = counts.work || 0;
    const study = counts.study || 0;

    return `${notes.length} notes: ${personal} personal, ${work} work, ${study} study.`;
}


// ==========================================
// 5. isDuplicate(text)
// Checks whether a note with the same text
// already exists, ignoring case and
// extra spaces.
// ==========================================

function isDuplicate(text) {
    const normalise = value =>
        value.trim().replace(/\s+/g, " ").toLowerCase();

    const cleanedText = normalise(text);

    return notes.some(note =>
        normalise(note.text) === cleanedText
    );
}


// ==========================================
// 6. addNote(text, category)
// Adds a valid note if:
// - Text is 1–200 characters
// - It is not a duplicate
// - Category is personal, work or study
// Returns true if added, false otherwise.
// ==========================================

function addNote(text, category) {

    // Check text length
    if (text.trim().length < 1 || text.length > 200) {
        console.log("Note not added: text must be between 1 and 200 characters.");
        return false;
    }

    // Check category
    const validCategories = ["personal", "work", "study"];

    if (!validCategories.includes(category)) {
        console.log("Note not added: invalid category.");
        return false;
    }

    // Check duplicate
    if (isDuplicate(text)) {
        console.log("Note not added: duplicate note.");
        return false;
    }

    // Generate a new ID
    const newId = notes.length > 0
        ? Math.max(...notes.map(note => note.id)) + 1
        : 1;

    // Add the note
    notes.push({
        id: newId,
        text: text.trim(),
        category: category
    });

    console.log("Note added successfully.");
    return true;
}
// ==========================================
// TESTING THE FUNCTIONS
// ==========================================

// 1. Test searchNotes()
console.log("Search for 'javascript':");
console.log(searchNotes("javascript"));


// 2. Test longestNote()
console.log("Longest note:");
console.log(longestNote());


// 3. Test countByCategory()
console.log("Notes by category:");
console.log(countByCategory());


// 4. Test getSummary()
console.log("Summary:");
console.log(getSummary());


// 5. Test isDuplicate()
console.log("Is 'Call mum' a duplicate?");
console.log(isDuplicate("Call mum"));

console.log("Is '   call   MUM   ' a duplicate?");
console.log(isDuplicate("   call   MUM   "));


// 6. Test addNote()
console.log("Adding a new work note:");
console.log(addNote("Prepare the monthly ICT report", "work"));


// Test duplicate
console.log("Trying to add a duplicate:");
console.log(addNote("  PREPARE   THE MONTHLY ICT REPORT ", "work"));


// Test invalid category
console.log("Trying to add an invalid category:");
console.log(addNote("Learn CSS Grid", "personal-development"));


// Test empty note
console.log("Trying to add an empty note:");
console.log(addNote("", "study"));


// Show final notes
console.log("Final notes:");
console.log(notes);


// Show updated summary
console.log("Updated summary:");
console.log(getSummary());

// The summary
//5 notes: 2 personal, 1 work, 2 study.
//Is 'Call mum' a duplicate?
//true

//Is '   call   MUM   ' a duplicate?
//true

//When you run:

//addNote("Prepare the monthly ICT report", "work")

//it should return:

true
//6 notes: 2 personal, 2 work, 2 study.