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
"use client";
;
;
;
const RoomContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function RoomProvider({ children }) {
    // Use a fixed roomId for all sessions
    const [roomId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("sunday-group");
    const [participants, setParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isGroupsFormed, setIsGroupsFormed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastFetchTime, setLastFetchTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Fetch room data from the server
    const fetchRoomData = async ()=>{
        try {
            const response = await fetch(`/api/room?roomId=${roomId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch room data');
            }
            const data = await response.json();
            setParticipants(data.participants);
            setGroups(data.groups);
            setIsGroupsFormed(data.isGroupsFormed);
            setError(null);
        } catch (err) {
            console.error('Error fetching room data:', err);
            setError('Failed to connect to the server');
        } finally{
            setIsLoading(false);
            setLastFetchTime(Date.now());
        }
    };
    // Initial data fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchRoomData();
    }, []);
    // Polling for updates every 3 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const intervalId = setInterval(()=>{
            // Only fetch if it's been more than 2 seconds since the last fetch
            // This prevents too many requests if we're already making API calls
            if (Date.now() - lastFetchTime > 2000) {
                fetchRoomData();
            }
        }, 3000);
        return ()=>clearInterval(intervalId);
    }, [
        lastFetchTime
    ]);
    // Add a participant who joined via the join page
    const addParticipant = async (name, isWillingToLead)=>{
        try {
            const participantId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUniqueId"])();
            const response = await fetch('/api/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomId,
                    action: 'addParticipant',
                    data: {
                        id: participantId,
                        name,
                        isWillingToLead
                    }
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add participant');
            }
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to add participant');
            }
            setParticipants(result.participants);
            setLastFetchTime(Date.now());
            return result.participant;
        } catch (err) {
            console.error('Error adding participant:', err);
            setError('Failed to add participant');
            throw err;
        }
    };
    // Add a participant manually from the host page
    const addParticipantManually = async (name, isWillingToLead)=>{
        await addParticipant(name, isWillingToLead);
    };
    // Remove a participant
    const removeParticipant = async (id)=>{
        try {
            const response = await fetch('/api/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomId,
                    action: 'removeParticipant',
                    data: {
                        participantId: id
                    }
                })
            });
            if (!response.ok) {
                throw new Error('Failed to remove participant');
            }
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to remove participant');
            }
            setParticipants(result.participants);
            setLastFetchTime(Date.now());
        } catch (err) {
            console.error('Error removing participant:', err);
            setError('Failed to remove participant');
            throw err;
        }
    };
    // Form groups from participants
    const createGroups = async ()=>{
        try {
            const response = await fetch('/api/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomId,
                    action: 'formGroups'
                })
            });
            if (!response.ok) {
                throw new Error('Failed to form groups');
            }
            const result = await response.json();
            if (!result.success) {
                return false; // Not enough leaders
            }
            setGroups(result.groups);
            setParticipants(result.participants);
            setIsGroupsFormed(result.isGroupsFormed);
            setLastFetchTime(Date.now());
            return true;
        } catch (err) {
            console.error('Error forming groups:', err);
            setError('Failed to form groups');
            return false;
        }
    };
    // Reset groups without clearing participants
    const resetGroups = async ()=>{
        try {
            const response = await fetch('/api/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomId,
                    action: 'resetGroups'
                })
            });
            if (!response.ok) {
                throw new Error('Failed to reset groups');
            }
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to reset groups');
            }
            setGroups(result.groups);
            setParticipants(result.participants);
            setIsGroupsFormed(result.isGroupsFormed);
            setLastFetchTime(Date.now());
        } catch (err) {
            console.error('Error resetting groups:', err);
            setError('Failed to reset groups');
            throw err;
        }
    };
    // Reset the entire room
    const resetRoom = async ()=>{
        try {
            const response = await fetch('/api/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomId,
                    action: 'resetRoom'
                })
            });
            if (!response.ok) {
                throw new Error('Failed to reset room');
            }
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to reset room');
            }
            setParticipants(result.participants);
            setGroups(result.groups);
            setIsGroupsFormed(result.isGroupsFormed);
            setLastFetchTime(Date.now());
        } catch (err) {
            console.error('Error resetting room:', err);
            setError('Failed to reset room');
            throw err;
        }
    };
    const value = {
        roomId,
        participants,
        groups,
        isGroupsFormed,
        isLoading,
        error,
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
        lineNumber: 282,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__66ca10ae._.js.map