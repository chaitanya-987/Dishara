/* ========================================
   Dishara — Firebase Integration
   ======================================== */

const firebaseConfig = {
    apiKey: "AIzaSyDxO-hDBMSqwEhGYK-HEXtnw1LNEfcycj0",
    authDomain: "dishara-df998.firebaseapp.com",
    projectId: "dishara-df998",
    storageBucket: "dishara-df998.firebasestorage.app",
    messagingSenderId: "1055127566026",
    appId: "1:1055127566026:web:fb59722b05d52cd6532633",
    measurementId: "G-YJ27YWSNMV"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ========================================
   RESTAURANTS
   ======================================== */
const DB = {

    // Save or update a restaurant
    async saveRestaurant(data) {
        const id = String(data.id || Date.now());
        await db.collection('restaurants').doc(id).set({ ...data, id }, { merge: true });
        return id;
    },

    // Get all restaurants (one-time)
    async getRestaurants() {
        const snap = await db.collection('restaurants').get();
        return snap.docs.map(d => d.data());
    },

    // Real-time listener for restaurants
    onRestaurants(callback) {
        return db.collection('restaurants').onSnapshot(snap => {
            callback(snap.docs.map(d => d.data()));
        });
    },

    // Delete a restaurant
    async deleteRestaurant(id) {
        await db.collection('restaurants').doc(String(id)).delete();
    },

    /* ========================================
       MENU ITEMS
       ======================================== */

    // Save a new menu item
    async saveMenuItem(item) {
        const id = String(item.id || Date.now());
        await db.collection('menuItems').doc(id).set({ ...item, id }, { merge: true });
        return id;
    },

    // Get all menu items (one-time)
    async getMenuItems(restaurantId = null) {
        let ref = db.collection('menuItems');
        if (restaurantId) ref = ref.where('restaurantId', '==', String(restaurantId));
        const snap = await ref.get();
        return snap.docs.map(d => d.data());
    },

    // Real-time listener for menu items
    onMenuItems(callback, restaurantId = null) {
        let ref = db.collection('menuItems');
        if (restaurantId) ref = ref.where('restaurantId', '==', String(restaurantId));
        return ref.onSnapshot(snap => {
            callback(snap.docs.map(d => d.data()));
        });
    },

    // Delete a menu item
    async deleteMenuItem(id) {
        await db.collection('menuItems').doc(String(id)).delete();
    },

    /* ========================================
       ORDERS
       ======================================== */

    // Save an order
    async saveOrder(order) {
        await db.collection('orders').doc(order.id).set(order);
        return order.id;
    },

    // Get orders for a user
    async getOrders(userId = null) {
        let ref = db.collection('orders').orderBy('date', 'desc');
        if (userId) ref = ref.where('userId', '==', userId);
        const snap = await ref.get();
        return snap.docs.map(d => d.data());
    },

    // Real-time listener for orders (for owner dashboard)
    onOrders(restaurantId, callback) {
        return db.collection('orders')
            .where('restaurantId', '==', String(restaurantId))
            .orderBy('date', 'desc')
            .onSnapshot(snap => callback(snap.docs.map(d => d.data())));
    },

    // Update order status
    async updateOrderStatus(orderId, status) {
        await db.collection('orders').doc(orderId).update({ status });
    },

    /* ========================================
       USERS
       ======================================== */

    async saveUser(user) {
        await db.collection('users').doc(String(user.id)).set(user, { merge: true });
    },

    async getUser(userId) {
        const doc = await db.collection('users').doc(String(userId)).get();
        return doc.exists ? doc.data() : null;
    }
};
