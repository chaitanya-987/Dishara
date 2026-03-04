/* ========================================
   CLOUD KITCHEN — Sample Data Store
   ======================================== */

const AppData = {
    categories: [
        { id: 1, name: 'Burgers', emoji: '🍔', count: 45 },
        { id: 2, name: 'Pizza', emoji: '🍕', count: 38 },
        { id: 3, name: 'Sushi', emoji: '🍣', count: 28 },
        { id: 4, name: 'Pasta', emoji: '🍝', count: 32 },
        { id: 5, name: 'Indian', emoji: '🍛', count: 52 },
        { id: 6, name: 'Chinese', emoji: '🥡', count: 35 },
        { id: 7, name: 'Desserts', emoji: '🍰', count: 41 },
        { id: 8, name: 'Drinks', emoji: '🥤', count: 29 },
        { id: 9, name: 'Salads', emoji: '🥗', count: 22 },
        { id: 10, name: 'Tacos', emoji: '🌮', count: 18 },
    ],

    restaurants: [
        {
            id: 1,
            name: 'Burger Palace',
            cuisine: 'american',
            rating: 4.8,
            reviews: 342,
            deliveryTime: '25-35 min',
            minOrder: 10,
            emoji: '🍔',
            description: 'Premium handcrafted burgers made with 100% Angus beef',
            address: '123 Burger Lane, NYC',
            featured: true,
            popular: true,
            image: null
        },
        {
            id: 2,
            name: 'Pizza Heaven',
            cuisine: 'italian',
            rating: 4.7,
            reviews: 289,
            deliveryTime: '30-40 min',
            minOrder: 15,
            emoji: '🍕',
            description: 'Authentic Italian pizzas baked in wood-fired ovens',
            address: '456 Pizza Ave, NYC',
            featured: true,
            popular: true,
            image: null
        },
        {
            id: 3,
            name: 'Sushi Master',
            cuisine: 'japanese',
            rating: 4.9,
            reviews: 198,
            deliveryTime: '35-45 min',
            minOrder: 20,
            emoji: '🍣',
            description: 'Fresh sushi and sashimi prepared by master chefs',
            address: '789 Sushi Blvd, NYC',
            featured: true,
            popular: false,
            image: null
        },
        {
            id: 4,
            name: 'Spice Garden',
            cuisine: 'indian',
            rating: 4.6,
            reviews: 456,
            deliveryTime: '20-30 min',
            minOrder: 12,
            emoji: '🍛',
            description: 'Aromatic Indian dishes with authentic spices and flavors',
            address: '321 Curry Road, NYC',
            featured: true,
            popular: true,
            image: null
        },
        {
            id: 5,
            name: 'Dragon Wok',
            cuisine: 'chinese',
            rating: 4.5,
            reviews: 267,
            deliveryTime: '25-35 min',
            minOrder: 10,
            emoji: '🥡',
            description: 'Traditional Chinese cuisine with a modern twist',
            address: '654 Wok Street, NYC',
            featured: false,
            popular: true,
            image: null
        },
        {
            id: 6,
            name: 'Taco Fiesta',
            cuisine: 'mexican',
            rating: 4.4,
            reviews: 312,
            deliveryTime: '15-25 min',
            minOrder: 8,
            emoji: '🌮',
            description: 'Vibrant Mexican street food bursting with flavor',
            address: '987 Fiesta Lane, NYC',
            featured: false,
            popular: true,
            image: null
        },
        {
            id: 7,
            name: 'Thai Orchid',
            cuisine: 'thai',
            rating: 4.7,
            reviews: 178,
            deliveryTime: '30-40 min',
            minOrder: 15,
            emoji: '🍜',
            description: 'Authentic Thai cuisine with fresh herbs and spices',
            address: '159 Orchid Way, NYC',
            featured: true,
            popular: false,
            image: null
        },
        {
            id: 8,
            name: 'Mediterranean Breeze',
            cuisine: 'mediterranean',
            rating: 4.6,
            reviews: 234,
            deliveryTime: '25-35 min',
            minOrder: 12,
            emoji: '🥙',
            description: 'Fresh Mediterranean dishes with the finest ingredients',
            address: '753 Olive Street, NYC',
            featured: false,
            popular: false,
            image: null
        },
        {
            id: 9,
            name: 'Sweet Tooth Bakery',
            cuisine: 'desserts',
            rating: 4.9,
            reviews: 521,
            deliveryTime: '20-30 min',
            minOrder: 8,
            emoji: '🎂',
            description: 'Heavenly desserts and pastries baked fresh daily',
            address: '246 Sweet Lane, NYC',
            featured: true,
            popular: true,
            image: null
        },
        {
            id: 10,
            name: 'Pasta Paradise',
            cuisine: 'italian',
            rating: 4.5,
            reviews: 189,
            deliveryTime: '25-35 min',
            minOrder: 14,
            emoji: '🍝',
            description: 'Handmade pasta dishes from the heart of Italy',
            address: '864 Pasta Blvd, NYC',
            featured: false,
            popular: false,
            image: null
        },
        {
            id: 11,
            name: 'Seoul Kitchen',
            cuisine: 'korean',
            rating: 4.8,
            reviews: 203,
            deliveryTime: '30-40 min',
            minOrder: 15,
            emoji: '🍱',
            description: 'Authentic Korean BBQ and traditional dishes',
            address: '975 Korean Way, NYC',
            featured: true,
            popular: true,
            image: null
        },
        {
            id: 12,
            name: 'Green Bowl',
            cuisine: 'healthy',
            rating: 4.4,
            reviews: 156,
            deliveryTime: '15-25 min',
            minOrder: 10,
            emoji: '🥗',
            description: 'Fresh, healthy bowls and smoothies for a better you',
            address: '135 Healthy St, NYC',
            featured: false,
            popular: false,
            image: null
        }
    ],

    menuItems: [
        // Burgers
        { id: 1, name: 'Classic Smash Burger', category: 'burgers', price: 12.99, emoji: '🍔', restaurant: 'Burger Palace', restaurantId: 1, description: 'Double smashed patties with American cheese, pickles, and special sauce', veg: false, spicy: false, popular: true, rating: 4.8 },
        { id: 2, name: 'BBQ Bacon Burger', category: 'burgers', price: 14.99, emoji: '🍔', restaurant: 'Burger Palace', restaurantId: 1, description: 'Smoky BBQ sauce, crispy bacon, cheddar cheese, and onion rings', veg: false, spicy: false, popular: true, rating: 4.7 },
        { id: 3, name: 'Mushroom Swiss Burger', category: 'burgers', price: 13.49, emoji: '🍔', restaurant: 'Burger Palace', restaurantId: 1, description: 'Sautéed mushrooms and melted Swiss cheese on a toasted brioche bun', veg: false, spicy: false, popular: false, rating: 4.5 },
        { id: 4, name: 'Veggie Burger Deluxe', category: 'burgers', price: 11.99, emoji: '🌱', restaurant: 'Burger Palace', restaurantId: 1, description: 'Plant-based patty with avocado, lettuce, tomato, and vegan mayo', veg: true, spicy: false, popular: false, rating: 4.3 },

        // Pizza
        { id: 5, name: 'Margherita Pizza', category: 'pizza', price: 14.99, emoji: '🍕', restaurant: 'Pizza Heaven', restaurantId: 2, description: 'San Marzano tomatoes, fresh mozzarella, basil, and olive oil', veg: true, spicy: false, popular: true, rating: 4.9 },
        { id: 6, name: 'Pepperoni Feast', category: 'pizza', price: 16.99, emoji: '🍕', restaurant: 'Pizza Heaven', restaurantId: 2, description: 'Loaded with double pepperoni and extra mozzarella cheese', veg: false, spicy: false, popular: true, rating: 4.8 },
        { id: 7, name: 'BBQ Chicken Pizza', category: 'pizza', price: 17.49, emoji: '🍕', restaurant: 'Pizza Heaven', restaurantId: 2, description: 'Grilled chicken, BBQ sauce, red onions, and cilantro', veg: false, spicy: false, popular: false, rating: 4.6 },
        { id: 8, name: 'Spicy Diavola', category: 'pizza', price: 15.99, emoji: '🌶️', restaurant: 'Pizza Heaven', restaurantId: 2, description: 'Spicy salami, chili flakes, jalapeños, and mozzarella', veg: false, spicy: true, popular: false, rating: 4.5 },

        // Sushi
        { id: 9, name: 'Rainbow Roll', category: 'sushi', price: 18.99, emoji: '🌈', restaurant: 'Sushi Master', restaurantId: 3, description: 'California roll topped with assorted sashimi and avocado', veg: false, spicy: false, popular: true, rating: 4.9 },
        { id: 10, name: 'Dragon Roll', category: 'sushi', price: 19.99, emoji: '🐉', restaurant: 'Sushi Master', restaurantId: 3, description: 'Shrimp tempura inside, eel and avocado on top with unagi sauce', veg: false, spicy: false, popular: true, rating: 4.8 },
        { id: 11, name: 'Spicy Tuna Roll', category: 'sushi', price: 16.99, emoji: '🍣', restaurant: 'Sushi Master', restaurantId: 3, description: 'Fresh tuna with spicy mayo, cucumber, and sesame seeds', veg: false, spicy: true, popular: false, rating: 4.7 },

        // Pasta
        { id: 12, name: 'Carbonara', category: 'pasta', price: 15.99, emoji: '🍝', restaurant: 'Pasta Paradise', restaurantId: 10, description: 'Creamy egg sauce with pancetta, Parmesan, and black pepper', veg: false, spicy: false, popular: true, rating: 4.7 },
        { id: 13, name: 'Penne Arrabbiata', category: 'pasta', price: 13.99, emoji: '🌶️', restaurant: 'Pasta Paradise', restaurantId: 10, description: 'Spicy tomato sauce with garlic, chili flakes, and fresh parsley', veg: true, spicy: true, popular: false, rating: 4.5 },
        { id: 14, name: 'Truffle Mushroom Pasta', category: 'pasta', price: 18.99, emoji: '🍄', restaurant: 'Pasta Paradise', restaurantId: 10, description: 'Wild mushrooms in truffle cream sauce with Parmesan shavings', veg: true, spicy: false, popular: true, rating: 4.8 },

        // Indian
        { id: 15, name: 'Butter Chicken', category: 'indian', price: 16.99, emoji: '🍗', restaurant: 'Spice Garden', restaurantId: 4, description: 'Tender chicken in rich, creamy tomato and butter sauce with spices', veg: false, spicy: false, popular: true, rating: 4.9 },
        { id: 16, name: 'Chicken Biryani', category: 'indian', price: 15.99, emoji: '🍚', restaurant: 'Spice Garden', restaurantId: 4, description: 'Fragrant basmati rice layered with spiced chicken and saffron', veg: false, spicy: true, popular: true, rating: 4.8 },
        { id: 17, name: 'Paneer Tikka Masala', category: 'indian', price: 14.99, emoji: '🧀', restaurant: 'Spice Garden', restaurantId: 4, description: 'Grilled paneer cubes in smoky tikka masala sauce', veg: true, spicy: true, popular: true, rating: 4.7 },
        { id: 18, name: 'Dal Makhani', category: 'indian', price: 12.99, emoji: '🫘', restaurant: 'Spice Garden', restaurantId: 4, description: 'Creamy black lentils slow-cooked with butter and cream', veg: true, spicy: false, popular: false, rating: 4.6 },

        // Chinese
        { id: 19, name: 'Kung Pao Chicken', category: 'chinese', price: 14.99, emoji: '🥜', restaurant: 'Dragon Wok', restaurantId: 5, description: 'Spicy diced chicken with peanuts, vegetables, and chili peppers', veg: false, spicy: true, popular: true, rating: 4.6 },
        { id: 20, name: 'Sweet & Sour Pork', category: 'chinese', price: 13.99, emoji: '🐷', restaurant: 'Dragon Wok', restaurantId: 5, description: 'Crispy pork in tangy sweet and sour sauce with pineapple', veg: false, spicy: false, popular: false, rating: 4.4 },
        { id: 21, name: 'Fried Rice Special', category: 'chinese', price: 11.99, emoji: '🍚', restaurant: 'Dragon Wok', restaurantId: 5, description: 'Wok-tossed rice with shrimp, vegetables, and egg', veg: false, spicy: false, popular: true, rating: 4.5 },

        // Desserts
        { id: 22, name: 'Chocolate Lava Cake', category: 'desserts', price: 9.99, emoji: '🍫', restaurant: 'Sweet Tooth Bakery', restaurantId: 9, description: 'Warm chocolate cake with a gooey molten center, served with ice cream', veg: true, spicy: false, popular: true, rating: 4.9 },
        { id: 23, name: 'New York Cheesecake', category: 'desserts', price: 8.99, emoji: '🍰', restaurant: 'Sweet Tooth Bakery', restaurantId: 9, description: 'Classic creamy cheesecake on graham cracker crust with berry compote', veg: true, spicy: false, popular: true, rating: 4.8 },
        { id: 24, name: 'Tiramisu', category: 'desserts', price: 10.99, emoji: '☕', restaurant: 'Sweet Tooth Bakery', restaurantId: 9, description: 'Italian coffee-flavored dessert with mascarpone and cocoa', veg: true, spicy: false, popular: false, rating: 4.7 },
        { id: 25, name: 'Crème Brûlée', category: 'desserts', price: 9.49, emoji: '🍮', restaurant: 'Sweet Tooth Bakery', restaurantId: 9, description: 'Rich vanilla custard with a crispy caramelized sugar top', veg: true, spicy: false, popular: false, rating: 4.6 },

        // Drinks
        { id: 26, name: 'Mango Smoothie', category: 'drinks', price: 6.99, emoji: '🥭', restaurant: 'Green Bowl', restaurantId: 12, description: 'Fresh mango blended with yogurt and a hint of honey', veg: true, spicy: false, popular: true, rating: 4.7 },
        { id: 27, name: 'Matcha Latte', category: 'drinks', price: 5.99, emoji: '🍵', restaurant: 'Green Bowl', restaurantId: 12, description: 'Premium matcha whisked with steamed oat milk', veg: true, spicy: false, popular: false, rating: 4.5 },
        { id: 28, name: 'Berry Blast Shake', category: 'drinks', price: 7.49, emoji: '🫐', restaurant: 'Green Bowl', restaurantId: 12, description: 'Mixed berries with vanilla ice cream and whipped cream', veg: true, spicy: false, popular: true, rating: 4.6 },
    ],

    testimonials: [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Food Enthusiast',
            avatar: '👩',
            rating: 5,
            text: 'Cloud Kitchen has completely changed how I order food! The variety of restaurants is incredible, and the delivery is always on time. Absolutely love it!'
        },
        {
            id: 2,
            name: 'Mike Chen',
            role: 'Restaurant Owner',
            avatar: '👨‍🍳',
            rating: 5,
            text: 'As a restaurant owner, this platform has been a game-changer. My orders increased by 200% in the first month. The dashboard is intuitive and powerful.'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Regular Customer',
            avatar: '👩‍💼',
            rating: 5,
            text: 'The food quality is consistently amazing across all restaurants. The tracking feature gives me peace of mind, and the prices are very reasonable.'
        },
        {
            id: 4,
            name: 'James Wilson',
            role: 'Tech Professional',
            avatar: '👨‍💻',
            rating: 4,
            text: 'Sleek interface, fast delivery, great customer support. I order lunch here every day at work. The subscription plan saves me a ton of money!'
        },
        {
            id: 5,
            name: 'Priya Sharma',
            role: 'Restaurant Owner',
            avatar: '👩‍🍳',
            rating: 5,
            text: 'The analytics dashboard helps me understand my customers better. Revenue has grown 150% since joining. Best decision for my business!'
        },
        {
            id: 6,
            name: 'David Kim',
            role: 'Food Blogger',
            avatar: '📸',
            rating: 5,
            text: 'I discover new amazing restaurants every week through Cloud Kitchen. The curated collections and recommendations are spot on. A foodie\'s paradise!'
        }
    ],

    promoCodes: {
        'WELCOME20': { discount: 20, type: 'percent', description: '20% off first order' },
        'FLAT50': { discount: 50, type: 'flat', description: '$50 off' },
        'CLOUD10': { discount: 10, type: 'percent', description: '10% off' },
    }
};
