import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Récupérer les statistiques
    const [
      totalUsers,
      totalMatches,
      totalTickets,
      totalRevenue,
      recentUsers,
      upcomingMatches,
      recentTickets
    ] = await Promise.all([
      // Nombre total d'utilisateurs
      prisma.user.count(),
      // Nombre total de matchs
      prisma.match.count(),
      // Nombre total de billets vendus
      prisma.ticket.count(),
      // Revenu total
      prisma.ticket.aggregate({
        _sum: {
          price: true
        }
      }),
      // 5 derniers utilisateurs
      prisma.user.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true
        }
      }),
      // 5 prochains matchs
      prisma.match.findMany({
        take: 5,
        where: {
          date: {
            gte: new Date()
          }
        },
        orderBy: {
          date: 'asc'
        },
        select: {
          id: true,
          homeTeam: {
            select: {
              name: true
            }
          },
          awayTeam: {
            select: {
              name: true
            }
          },
          date: true,
          place: true,
          _count: {
            select: {
              tickets: true
            }
          }
        }
      }),
      // 5 dernières ventes de billets
      prisma.ticket.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          price: true,
          createdAt: true,
          match: {
            select: {
              homeTeam: {
                select: {
                  name: true
                }
              },
              awayTeam: {
                select: {
                  name: true
                }
              },
              date: true
            }
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      })
    ])

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalMatches,
          totalTickets,
          totalRevenue: totalRevenue._sum.price || 0
        },
        recentUsers,
        upcomingMatches: upcomingMatches.map(match => ({
          id: match.id,
          title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          date: match.date,
          location: match.place,
          tickets: {
            _count: match._count.tickets
          }
        })),
        recentTickets: recentTickets.map(ticket => ({
          id: ticket.id,
          price: ticket.price,
          createdAt: ticket.createdAt,
          match: {
            title: `${ticket.match.homeTeam.name} vs ${ticket.match.awayTeam.name}`,
            date: ticket.match.date
          },
          user: ticket.user
        }))
      }
    })
  } catch (error) {
    console.error("❌ [ADMIN DASHBOARD] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la récupération des données" },
      { status: 500 }
    )
  }
} 