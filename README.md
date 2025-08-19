
# Quest Up 🎮✨  

QuestUp is a full-stack web application designed to **help users improve productivity by turning daily tasks into a game**.  
The app provides **customized plans** that fit users’ schedules, needs, and goals, while incorporating **video game-style mechanics** such as:  

- 📅 **Daily & Weekly Quests**  
- 🏆 **Special Challenges**  
- 🎯 **Progress Tracking & Goal Setting**  
- 💎 **Dynamic Reward System**  
- 🚀 **Engaging Game Loops**  

By blending productivity with gamification, Quest Up transforms building habits into an **addictive and satisfying experience**.  

---

## 📦 Installation & Setup  

Follow these steps to set up the project locally:  

### 1. Clone the Repository  
```bash
git clone https://github.com/alijradii/quest-up.git
cd quest-up
````

### 2. Environment Setup

```bash
cp .env.example .env
```

### 3. Start Docker Containers

```bash
./vendor/bin/sail up -d
```

### 4. Backend Setup

In another terminal:

```bash
# Install dependencies
./vendor/bin/sail composer install

# Run migrations
./vendor/bin/sail artisan migrate
```

### 5. Frontend Setup

```bash
npm install
npm run dev
```

The application should now be accessible at **[http://localhost:5173](http://localhost:5173/)** 🎉

