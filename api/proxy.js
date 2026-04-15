export default async function handler(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
    }

    try {
        const userUrl = `https://users.roblox.com/v1/users/${userId}`;
        const premiumUrl = `https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`;

        const [userRes, premiumRes] = await Promise.all([
            fetch(userUrl),
            fetch(premiumUrl)
        ]);

        const userData = await userRes.json();
        const premiumText = await premiumRes.text();

        return res.status(200).json({
            userId: userData.id,
            name: userData.name,
            displayName: userData.displayName,
            description: userData.description || "",
            created: userData.created || null,
            hasVerifiedBadge: userData.hasVerifiedBadge === true,
            hasPremium: premiumText === "true"
        });

    } catch {
        return res.status(500).json({ error: "Proxy Error" });
    }
}
