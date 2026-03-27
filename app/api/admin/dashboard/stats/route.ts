import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [
      totalDiamonds,
      availableDiamonds,
      totalCollections,
      totalProducts,
      recentInquiries,
      recentAppointments,
      diamondsByShape,
      diamondsByLab,
    ] = await Promise.all([
      prisma.diamond.count(),
      prisma.diamond.count({ where: { available: true } }),
      prisma.collection.count(),
      prisma.product.count(),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { diamond: true },
      }),
      prisma.appointment.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.diamond.groupBy({
        by: ["shape"],
        _count: { id: true },
      }),
      prisma.diamond.groupBy({
        by: ["lab"],
        _count: { id: true },
      }),
    ]);

    const inquiries = await prisma.inquiry.count();
    const newInquiries = await prisma.inquiry.count({ where: { status: "NEW" } });
    const appointments = await prisma.appointment.count();
    const pendingAppointments = await prisma.appointment.count({ where: { status: "REQUESTED" } });

    return NextResponse.json({
      diamonds: {
        total: totalDiamonds,
        available: availableDiamonds,
        byShape: diamondsByShape,
        byLab: diamondsByLab,
      },
      catalog: {
        collections: totalCollections,
        products: totalProducts,
      },
      inquiries: {
        total: inquiries,
        new: newInquiries,
        recent: recentInquiries,
      },
      appointments: {
        total: appointments,
        pending: pendingAppointments,
        recent: recentAppointments,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
