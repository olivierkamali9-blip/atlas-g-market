import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface SearchFilters {
  query?: string;
  category?: string;
  type?: 'PRODUCT' | 'SERVICE' | 'JOB' | 'RENTAL' | 'OTHER';
  condition?: 'NEW' | 'USED' | 'REFURBISHED' | 'N_A';
  minPrice?: number;
  maxPrice?: number;
  attributes?: Record<string, any>;
  sortBy?: 'created_at' | 'price' | 'relevance';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export class SearchService {
  static async searchListings(filters: SearchFilters) {
    const {
      query,
      category,
      type,
      condition,
      minPrice,
      maxPrice,
      attributes,
      sortBy = 'created_at',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = filters;

    const where: Prisma.ListingWhereInput = {
      status: 'ACTIVE',
      ...(type && { listingType: type }),
      ...(category && { categorySlug: category }),
      ...(condition && { condition }),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          }
        : {}),
      ...(query && {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: [query.toLowerCase()] } },
        ],
      }),
      ...(attributes && {
        metadata: {
          path: [],
          equals: attributes,
        },
      }),
    };

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { user: { select: { id: true, name: true, rating: true } } },
      }),
      prisma.listing.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async createMatchInterest(listingId: string, requesterId: string, message?: string) {
    return prisma.connection.create({
      data: {
        listingId,
        requesterId,
        status: 'PENDING',
        initialMessage: message,
      },
      include: {
        listing: true,
        requester: { select: { id: true, name: true, email: true } },
      },
    });
  }
}