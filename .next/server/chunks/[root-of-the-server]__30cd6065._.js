module.exports = {

"[project]/.next-internal/server/app/api/room/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/app/api/room/data.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getRoomData": (()=>getRoomData),
    "resetRoom": (()=>resetRoom),
    "updateRoomData": (()=>updateRoomData)
});
// Initialize with empty data
const roomsData = {
    'sunday-group': {
        participants: [],
        groups: null,
        isGroupsFormed: false
    }
};
function getRoomData(roomId) {
    // Return the room data or create it if it doesn't exist
    if (!roomsData[roomId]) {
        roomsData[roomId] = {
            participants: [],
            groups: null,
            isGroupsFormed: false
        };
    }
    return roomsData[roomId];
}
function updateRoomData(roomId, data) {
    const room = getRoomData(roomId);
    // Update only the provided fields
    if (data.participants !== undefined) {
        room.participants = data.participants;
    }
    if (data.groups !== undefined) {
        room.groups = data.groups;
    }
    if (data.isGroupsFormed !== undefined) {
        room.isGroupsFormed = data.isGroupsFormed;
    }
    return room;
}
function resetRoom(roomId) {
    roomsData[roomId] = {
        participants: [],
        groups: null,
        isGroupsFormed: false
    };
}
}}),
"[project]/app/utils/types.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/app/utils/groupFormation.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "formGroups": (()=>formGroups)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/types.ts [app-route] (ecmascript)");
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
                id: `group-${i + 1}`,
                name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRandomBibleBook"])(),
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
"[project]/app/api/room/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST),
    "dynamic": (()=>dynamic)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/room/data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$groupFormation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/groupFormation.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const roomId = searchParams.get('roomId') || 'sunday-group';
    const roomData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRoomData"])(roomId);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(roomData);
}
async function POST(request) {
    try {
        const body = await request.json();
        const { roomId = 'sunday-group', action, data } = body;
        const roomData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRoomData"])(roomId);
        switch(action){
            case 'addParticipant':
                {
                    const { name, isWillingToLead } = data;
                    const newParticipant = {
                        id: data.id || Math.random().toString(36).substring(2, 9),
                        name,
                        isWillingToLead
                    };
                    const updatedParticipants = [
                        ...roomData.participants,
                        newParticipant
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRoomData"])(roomId, {
                        participants: updatedParticipants
                    });
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        participant: newParticipant,
                        participants: updatedParticipants
                    });
                }
            case 'removeParticipant':
                {
                    const { participantId } = data;
                    const updatedParticipants = roomData.participants.filter((p)=>p.id !== participantId);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRoomData"])(roomId, {
                        participants: updatedParticipants
                    });
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        participants: updatedParticipants
                    });
                }
            case 'formGroups':
                {
                    const newGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$groupFormation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formGroups"])(roomData.participants);
                    if (newGroups === null) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: false,
                            error: 'Not enough willing leaders to form groups'
                        });
                    }
                    // Update participants with their group assignments
                    const updatedParticipants = roomData.participants.map((p)=>{
                        const group = newGroups.find((g)=>g.participants.some((gp)=>gp.id === p.id));
                        if (group) {
                            return {
                                ...p,
                                groupId: group.id
                            };
                        }
                        return p;
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRoomData"])(roomId, {
                        groups: newGroups,
                        participants: updatedParticipants,
                        isGroupsFormed: true
                    });
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        groups: newGroups,
                        participants: updatedParticipants,
                        isGroupsFormed: true
                    });
                }
            case 'resetGroups':
                {
                    // Clear group assignments from participants
                    const updatedParticipants = roomData.participants.map((p)=>({
                            ...p,
                            groupId: undefined
                        }));
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRoomData"])(roomId, {
                        groups: null,
                        participants: updatedParticipants,
                        isGroupsFormed: false
                    });
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        groups: null,
                        participants: updatedParticipants,
                        isGroupsFormed: false
                    });
                }
            case 'resetRoom':
                {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$room$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resetRoom"])(roomId);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        participants: [],
                        groups: null,
                        isGroupsFormed: false
                    });
                }
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Invalid action'
                }, {
                    status: 400
                });
        }
    } catch (error) {
        console.error('API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Server error'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__30cd6065._.js.map