const firebaseConfig = {
    apiKey: "AIzaSyCRFGDUCA_U7lyGtLlcQ_0zheXXfQ19IFs",
    authDomain: "christmas-game-dcc48.firebaseapp.com",
    projectId: "christmas-game-dcc48",
    storageBucket: "christmas-game-dcc48.appspot.com",
    messagingSenderId: "581226468362",
    appId: "1:581226468362:web:3d46bb0fc3d752b953fbf3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export let leaderboardStats = [];

export function getLeaderboard() {
    console.log("get leaderboard")
    return db.collection("users").orderBy('level', 'desc').orderBy('gas_used').limit(10).get().then((querySnapshot) => {
        leaderboardStats = [];
        querySnapshot.forEach((doc) => {
            leaderboardStats.push(doc.data())
        });
        console.log("leaderboard retrieved", leaderboardStats)
        return true;
    });
}

export function savePlayer(player) {
    console.log("save player")
    return db.collection("users").add(player).then(() => {
        console.log("player saved")
        return getLeaderboard()
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}