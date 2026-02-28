document.addEventListener('DOMContentLoaded', () => {
    const curtainContainer = document.getElementById('curtain-container');
    const openBtn = document.getElementById('open-curtain-btn');

    openBtn.addEventListener('click', () => {
        curtainContainer.classList.add('open');

        const music = document.getElementById('welcome-music');
        music.play().catch(error => {
            console.log("Audio play failed:", error);
        });

        // Image Revelation Sequence (Only images first)
        setTimeout(() => {
            const images = document.querySelectorAll('#image-revelation .reveal-item');
            images.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 1500);
            });
        }, 2000);

        // Delayed "Meet the Family" Button (10 seconds)
        setTimeout(() => {
            const familyBtnBox = document.querySelector('.action-box');
            if (familyBtnBox) {
                familyBtnBox.classList.add('show');
            }
        }, 20000);

        // Balloon Release
        releaseBalloons();
    });

    // Family Introduction Logic (Slideshow)
    const meetFamilyBtn = document.getElementById('meet-family-btn');
    const welcomeContent = document.getElementById('welcome-content');
    const familySection = document.getElementById('family-section');
    const backBtn = document.getElementById('back-to-welcome');
    const nextBtn = document.getElementById('next-member-btn');

    // Family Data
    const familyMembers = [
        {
            name: "Mr. Sharma",
            relation: "Groom's Father",
            funFact: "He makes the best morning tea! ☕",
            img: "family.jpeg"
        },
        {
            name: "Mrs. Sharma",
            relation: "Groom's Mother",
            funFact: "She can cook 10 dishes in 1 hour! 🍲",
            img: "family.jpeg"
        },
        {
            name: "Rahul",
            relation: "Couple's Brother",
            funFact: "Hidden talent for mimicry. 🎭",
            img: "family.jpeg"
        },
        {
            name: "Anjali",
            relation: "Couple's Sister",
            funFact: "Professional level bathroom singer. 🎤",
            img: "family.jpeg"
        }
    ];

    let currentMemberIndex = 0;

    function updateMemberCard(index) {
        const card = document.getElementById('active-member-card');
        const member = familyMembers[index];

        // Add a small exit animation
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';

        setTimeout(() => {
            document.getElementById('member-img').src = member.img;
            document.getElementById('member-name').textContent = member.name;
            document.getElementById('member-relation').textContent = member.relation;
            document.getElementById('member-fun-fact').innerHTML = `<strong>Fun Fact:</strong> ${member.funFact}`;

            // Re-reveal with entrance animation
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 400);
    }

    meetFamilyBtn.addEventListener('click', () => {
        welcomeContent.classList.add('fade-out');
        setTimeout(() => {
            familySection.classList.add('show');
            currentMemberIndex = 0;
            updateMemberCard(0);
        }, 800);
    });

    nextBtn.addEventListener('click', () => {
        if (currentMemberIndex < familyMembers.length - 1) {
            currentMemberIndex++;
            updateMemberCard(currentMemberIndex);

            // Change text on last member
            if (currentMemberIndex === familyMembers.length - 1) {
                nextBtn.textContent = "Finish & Surprise! ✨";
            }
        } else {
            // All members done, go to final sweet message
            // Show final section immediately (since it has higher z-index)
            const finalSection = document.getElementById('final-section');
            finalSection.style.display = 'flex';

            setTimeout(() => {
                finalSection.classList.add('show');
                // Hide family section after the transition starts
                familySection.classList.remove('show');
            }, 50);
        }
    });

    // Restart Journey
    document.getElementById('restart-journey').addEventListener('click', () => {
        location.reload(); // Simple way to reset everything for a fresh start
    });

    backBtn.addEventListener('click', () => {
        familySection.classList.remove('show');
        setTimeout(() => {
            welcomeContent.classList.remove('fade-out');
        }, 400);
    });

    function releaseBalloons() {
        const container = document.getElementById('balloon-container');
        const colors = ['#FF5722', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#FFEB3B'];

        for (let i = 0; i < 30; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const size = 30 + Math.random() * 30;
            const drift = (Math.random() - 0.5) * 100; // Left/Right drift

            balloon.style.backgroundColor = color;
            balloon.style.left = `${left}%`;
            balloon.style.animationDelay = `${delay}s`;
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.2}px`;
            balloon.style.setProperty('--drift', `${drift}px`);

            container.appendChild(balloon);
        }
    }
});
