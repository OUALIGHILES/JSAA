// prisma/seed.ts
import { PrismaClient, TicketStatus, SubscriptionStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  // --- 1. Teams (20 teams) ---
  const teamNames = [
    'Red Warriors','Blue Knights','Green Giants','Yellow Tigers','Black Panthers',
    'Silver Arrows','Golden Eagles','Crimson Hawks','Azure Dragons','Emerald Bears',
    'White Wolves','Purple Cobras','Orange Foxes','Brown Bulls','Pink Flamingos',
    'Violet Vipers','Gray Gorillas','Scarlet Sharks','Teal Torpedoes','Maroon Meteors'
  ];
  const teams = [];
  for (let i = 0; i < teamNames.length; i++) {
    const id = `team${i + 1}`;
    const team = await prisma.team.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name: teamNames[i],
        classment: i + 1,
        logoUrl: faker.image.sports(200, 200, true),
        createdAt: faker.date.past(2),
      },
    });
    teams.push(team);
  }

  // --- 2. Users (200 users) ---
  const users = [];
  for (let i = 1; i <= 200; i++) {
    const id = faker.datatype.uuid();
    const email = faker.internet.email().toLowerCase();
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id,
        email,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(12), // NOTE: hash in production
        image: faker.image.avatar(),
        createdAt: faker.date.past(1),
      },
    });
    users.push(user);
  }

  // --- 3. Accounts & Sessions (100 accounts, 100 sessions) ---
  const providers = ['google', 'facebook', 'twitter', 'github'];
  const accounts = [];
  for (let i = 0; i < 100; i++) {
    const user = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    const id = faker.datatype.uuid();
    const provider = faker.helpers.arrayElement(providers);
    const account = await prisma.account.upsert({
      where: { id },
      update: {},
      create: {
        id,
        userId: user.id,
        type: 'oauth',
        provider,
        providerAccountId: faker.datatype.uuid(),
        access_token: faker.datatype.uuid(),
        expires_at: faker.datatype.number({ min: 1600000000, max: 1900000000 }),
      },
    });
    accounts.push(account);

    // Create a session for each account
    await prisma.session.create({
      data: {
        id: faker.datatype.uuid(),
        sessionToken: faker.datatype.uuid(),
        userId: user.id,
        expires: faker.date.future(0.1),
      },
    });
  }

  // --- 4. VerificationTokens (50) ---
  for (let i = 0; i < 50; i++) {
    await prisma.verificationToken.create({
      data: {
        identifier: faker.internet.email().toLowerCase(),
        token: faker.datatype.uuid(),
        expires: faker.date.future(0.2),
      },
    });
  }

  // --- 5. Matches (300 matches) ---
  const matches = [];
  for (let i = 1; i <= 300; i++) {
    const home = faker.helpers.arrayElement(teams);
    let away = faker.helpers.arrayElement(teams);
    if (away.id === home.id) away = teams[(teams.indexOf(home) + 1) % teams.length];
    const date = faker.date.between('2025-01-01', '2025-12-31');
    const status = date > new Date() ? 'À venir' : date < new Date() ? 'Terminé' : 'En cours';
    const match = await prisma.match.upsert({
      where: { id: `match${i}` },
      update: {},
      create: {
        id: `match${i}`,
        homeTeamId: home.id,
        awayTeamId: away.id,
        place: faker.address.city() + ' Stadium',
        date,
        status,
        time: date.toTimeString().substr(0,5),
        createdAt: faker.date.past(0.5),
      },
    });
    matches.push(match);

    // Create statistics for some matches
    if (faker.datatype.boolean()) {
      await prisma.matchStatistics.create({
        data: {
          matchId: match.id,
          possessionHome: faker.datatype.number({ min: 30, max: 70 }),
          possessionAway: faker.datatype.number({ min: 30, max: 70 }),
          shotsHome: faker.datatype.number({ min: 1, max: 20 }),
          shotsAway: faker.datatype.number({ min: 1, max: 20 }),
          shotsOnTargetHome: faker.datatype.number({ min: 0, max: 10 }),
          shotsOnTargetAway: faker.datatype.number({ min: 0, max: 10 }),
          cornersHome: faker.datatype.number({ min: 0, max: 10 }),
          cornersAway: faker.datatype.number({ min: 0, max: 10 }),
          foulsHome: faker.datatype.number({ min: 0, max: 15 }),
          foulsAway: faker.datatype.number({ min: 0, max: 15 }),
          yellowCardsHome: faker.datatype.number({ min: 0, max: 5 }),
          yellowCardsAway: faker.datatype.number({ min: 0, max: 5 }),
          redCardsHome: faker.datatype.number({ min: 0, max: 2 }),
          redCardsAway: faker.datatype.number({ min: 0, max: 2 }),
        },
      });
    }

    // Create events for matches
    const eventCount = faker.datatype.number({ min: 0, max: 10 });
    for (let e = 0; e < eventCount; e++) {
      await prisma.event.create({
        data: {
          matchId: match.id,
          minute: faker.datatype.number({ min: 1, max: 90 }),
          type: faker.helpers.arrayElement(['GOAL', 'YELLOW_CARD', 'RED_CARD', 'SUBSTITUTION']),
          team: faker.helpers.arrayElement([home.id, away.id]),
          player: faker.name.findName(),
        },
      });
    }
  }

  // --- 6. Tickets (random between 1-20 per match) ---
  for (const m of matches) {
    const ticketCount = faker.datatype.number({ min: 1, max: 20 });
    for (let t = 1; t <= ticketCount; t++) {
      const user = faker.helpers.arrayElement(users);
      await prisma.ticket.create({
        data: {
          id: faker.datatype.uuid(),
          matchId: m.id,
          userId: user.id,
          quantity: faker.datatype.number({ min: 1, max: 5 }),
          price: parseFloat(faker.commerce.price(10, 200, 2)),
          status: faker.helpers.arrayElement(Object.values(TicketStatus)) as TicketStatus,
          seatInfo: `Section ${faker.datatype.number({ min: 1, max: 50 })}, Row ${faker.datatype.number({ min: 1, max: 30 })}`,
        },
      });
    }
  }

  // --- 7. Subscriptions (0-5 per user) ---
  for (const u of users) {
    const subsCount = faker.datatype.number({ min: 0, max: 5 });
    for (let s = 0; s < subsCount; s++) {
      const team = faker.helpers.arrayElement(teams);
      const startDate = faker.date.past(1);
      const endDate = faker.date.future(1, startDate);
      await prisma.subscription.create({
        data: {
          id: faker.datatype.uuid(),
          userId: u.id,
          teamId: team.id,
          startDate,
          endDate,
          price: parseFloat(faker.commerce.price(30, 300, 2)),
          status: faker.helpers.arrayElement(Object.values(SubscriptionStatus)) as SubscriptionStatus,
        },
      });
    }
  }

  console.log('✅ Database seeded extensively with all entities and edge cases.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
