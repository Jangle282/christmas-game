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

let playerRef
export let leaderboardStats = [];

export function getLeaderboard() {
    console.log("get leaderboard")
    db.collection("users").orderBy('level', 'desc').orderBy('gas_used').limit(10).get().then((querySnapshot) => {
        leaderboardStats = [];
        querySnapshot.forEach((doc) => {
            leaderboardStats.push(doc.data())
        });
        console.log("leaderboard retrieved", leaderboardStats)
    });
}

export function savePlayer(name) {
    console.log("save player")
    db.collection("users").add({
        name: name,
        gas_used: 0,
        level: 1,
        finished: false
    }).then((docRef) => {
        playerRef = docRef
        console.log("player saved")
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export function updatePlayer(data) {
    console.log("update player")
    playerRef.update(data).then(() => {
        getLeaderboard()
        console.log("player updated");
    }).catch(function (error) {
        console.error("Error updating document: ", error);
    });

}