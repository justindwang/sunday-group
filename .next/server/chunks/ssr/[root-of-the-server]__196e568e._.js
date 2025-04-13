module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/app/utils/types.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BIBLE_BOOKS": (()=>BIBLE_BOOKS),
    "generateUniqueId": (()=>generateUniqueId),
    "getRandomBibleBook": (()=>getRandomBibleBook)
});
const BIBLE_BOOKS = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song of Solomon",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Thessalonians",
    "2 Thessalonians",
    "1 Timothy",
    "2 Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "1 John",
    "2 John",
    "3 John",
    "Jude",
    "Revelation"
];
function getRandomBibleBook() {
    return BIBLE_BOOKS[Math.floor(Math.random() * BIBLE_BOOKS.length)];
}
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 9);
}
}}),
"[project]/app/utils/groupFormation.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "formGroups": (()=>formGroups)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/types.ts [app-ssr] (ecmascript)");
;
function formGroups(participants) {
    if (participants.length === 0) return [];
    // Count willing leaders
    const willingLeaders = participants.filter((p)=>p.isWillingToLead);
    // Calculate how many groups we need
    const minGroupSize = 4;
    const maxGroupSize = 6;
    const totalParticipants = participants.length;
    // Calculate min and max number of groups possible
    const maxGroups = Math.floor(totalParticipants / minGroupSize);
    const minGroups = Math.ceil(totalParticipants / maxGroupSize);
    // If we don't have enough leaders, return null
    if (willingLeaders.length < minGroups) {
        return null;
    }
    // Determine optimal number of groups
    let numGroups = Math.min(maxGroups, willingLeaders.length);
    numGroups = Math.max(numGroups, minGroups);
    // Shuffle participants
    const shuffledParticipants = [
        ...participants
    ].sort(()=>Math.random() - 0.5);
    // Separate leaders and non-leaders
    const leaders = shuffledParticipants.filter((p)=>p.isWillingToLead);
    const nonLeaders = shuffledParticipants.filter((p)=>!p.isWillingToLead);
    // Initialize groups with one leader each
    const groups = [];
    for(let i = 0; i < numGroups; i++){
        if (i < leaders.length) {
            groups.push({
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUniqueId"])(),
                name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRandomBibleBook"])(),
                participants: [
                    leaders[i]
                ],
                hasLeader: true
            });
        }
    }
    // Distribute remaining leaders
    for(let i = numGroups; i < leaders.length; i++){
        const groupIndex = i % numGroups;
        groups[groupIndex].participants.push(leaders[i]);
    }
    // Distribute non-leaders evenly
    for(let i = 0; i < nonLeaders.length; i++){
        // Find the group with the fewest participants
        const groupIndex = groups.map((group, index)=>({
                index,
                count: group.participants.length
            })).sort((a, b)=>a.count - b.count)[0].index;
        groups[groupIndex].participants.push(nonLeaders[i]);
    }
    // Update participant groupIds
    groups.forEach((group)=>{
        group.participants.forEach((participant)=>{
            participant.groupId = group.id;
        });
    });
    return groups;
}
}}),
"[project]/app/context/RoomContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RoomProvider": (()=>RoomProvider),
    "useRoom": (()=>useRoom)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$groupFormation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/groupFormation.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const RoomContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Helper function to safely parse JSON from localStorage
const safelyParseJSON = (json, fallback = null)=>{
    if (!json) return fallback;
    try {
        return JSON.parse(json);
    } catch (e) {
        console.error('Failed to parse JSON from localStorage:', e);
        return fallback;
    }
};
function RoomProvider({ children }) {
    // Initialize state from localStorage if available, otherwise generate new values
    const [roomId, setRoomId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUniqueId"])();
        "TURBOPACK unreachable";
    });
    const [participants, setParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return [];
        "TURBOPACK unreachable";
    });
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
    });
    const [isGroupsFormed, setIsGroupsFormed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        "TURBOPACK unreachable";
    });
    // Persist state to localStorage whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }, [
        roomId,
        participants,
        groups,
        isGroupsFormed
    ]);
    // Add a participant who joined via the join page
    const addParticipant = (name, isWillingToLead)=>{
        const newParticipant = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUniqueId"])(),
            name,
            isWillingToLead
        };
        setParticipants((prev)=>[
                ...prev,
                newParticipant
            ]);
        return newParticipant;
    };
    // Add a participant manually from the host page
    const addParticipantManually = (name, isWillingToLead)=>{
        addParticipant(name, isWillingToLead);
    };
    // Remove a participant
    const removeParticipant = (id)=>{
        setParticipants((prev)=>prev.filter((p)=>p.id !== id));
    };
    // Form groups from participants
    const createGroups = ()=>{
        const newGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$groupFormation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formGroups"])(participants);
        if (newGroups === null) {
            return false; // Not enough leaders
        }
        setGroups(newGroups);
        setIsGroupsFormed(true);
        return true;
    };
    // Reset groups without clearing participants
    const resetGroups = ()=>{
        setGroups(null);
        setIsGroupsFormed(false);
        // Clear group assignments from participants
        setParticipants((prev)=>prev.map((p)=>({
                    ...p,
                    groupId: undefined
                })));
    };
    // Reset the entire room
    const resetRoom = ()=>{
        const newRoomId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUniqueId"])();
        setRoomId(newRoomId);
        setParticipants([]);
        setGroups(null);
        setIsGroupsFormed(false);
    };
    const value = {
        roomId,
        participants,
        groups,
        isGroupsFormed,
        addParticipant,
        addParticipantManually,
        removeParticipant,
        formGroups: createGroups,
        resetGroups,
        resetRoom
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoomContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/RoomContext.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
function useRoom() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(RoomContext);
    if (context === undefined) {
        throw new Error('useRoom must be used within a RoomProvider');
    }
    return context;
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else {
                "TURBOPACK unreachable";
            }
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__196e568e._.js.map