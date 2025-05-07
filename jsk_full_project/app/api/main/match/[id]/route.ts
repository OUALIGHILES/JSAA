import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'


// Données mockées temporaires
const mockMatchDetails = {
  1: {
    id: 1,
    date: "2024-04-26T20:00:00",
    time: "20:00",
    homeTeam: {
      name: "JSK",
      logo: "/images/jsk.png",
      score: 2,
      lineup: [
        { number: 1, name: "Mohamed Lamine Zemmamouche", position: "Gardien" },
        { number: 2, name: "Abdelkader Salhi", position: "Défenseur" },
        { number: 3, name: "Mohamed Rabie Meftah", position: "Défenseur" },
        { number: 4, name: "Abdelkader Laïfaoui", position: "Défenseur" },
        { number: 5, name: "Mohamed Amine Tougai", position: "Défenseur" },
        { number: 6, name: "Hocine El Orfi", position: "Milieu" },
        { number: 7, name: "Abdelmoumen Djabou", position: "Milieu" },
        { number: 8, name: "Mohamed Amine Aoudia", position: "Milieu" },
        { number: 9, name: "Mohamed Amine Hamia", position: "Attaquant" },
        { number: 10, name: "Mohamed Amine Tougai", position: "Attaquant" },
        { number: 11, name: "Mohamed Amine Tougai", position: "Attaquant" }
      ]
    },
    awayTeam: {
      name: "CR Belouizdad",
      logo: "/images/crb.png",
      score: 1,
      lineup: [
        { number: 1, name: "Alexis Guendouz", position: "Gardien" },
        { number: 2, name: "Mohamed Reda Halaimia", position: "Défenseur" },
        { number: 3, name: "Mohamed Amine Tougai", position: "Défenseur" },
        { number: 4, name: "Mohamed Amine Tougai", position: "Défenseur" },
        { number: 5, name: "Mohamed Amine Tougai", position: "Défenseur" },
        { number: 6, name: "Mohamed Amine Tougai", position: "Milieu" },
        { number: 7, name: "Mohamed Amine Tougai", position: "Milieu" },
        { number: 8, name: "Mohamed Amine Tougai", position: "Milieu" },
        { number: 9, name: "Mohamed Amine Tougai", position: "Attaquant" },
        { number: 10, name: "Mohamed Amine Tougai", position: "Attaquant" },
        { number: 11, name: "Mohamed Amine Tougai", position: "Attaquant" }
      ]
    },
    location: "Stade Hocine Ait Ahmed",
    competition: "Ligue 1",
    status: "Terminé",
    events: [
      { minute: 15, type: "but", team: "home", player: "Mohamed Amine Hamia" },
      { minute: 45, type: "but", team: "away", player: "Mohamed Amine Tougai" },
      { minute: 75, type: "but", team: "home", player: "Abdelmoumen Djabou" }
    ],
    statistics: {
      possession: { home: 55, away: 45 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 5, away: 3 },
      corners: { home: 6, away: 4 },
      fouls: { home: 15, away: 18 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 0 }
    }
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const match = await prisma.match.findUnique({
      where: {
        id: parseInt(params.id)
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
            logo: true
          }
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
            logo: true
          }
        },
        events: {
          orderBy: {
            minute: 'asc'
          }
        },
        statistics: true
      }
    })

    if (!match) {
      return NextResponse.json(
        { error: "Match non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: match })
  } catch (error) {
    console.error('Error fetching match details:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des détails du match" },
      { status: 500 }
    )
  }
} 