'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Products
export async function getProducts(categorySlug?: string) {
  if (categorySlug) {
    return await prisma.product.findMany({
      where: { categorySlug },
      orderBy: { createdAt: 'desc' }
    });
  }
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug }
  });
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({
    where: { slug }
  });
}

export async function upsertProduct(data: any) {
  const { id, ...rest } = data;
  const productData = {
    ...rest,
    features: JSON.stringify(rest.features),
    specs: JSON.stringify(rest.specs),
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data: productData
    });
  } else {
    await prisma.product.create({
      data: productData
    });
  }
  revalidatePath('/admin/products');
  revalidatePath('/products');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/products');
}

// News
export async function getNews() {
  return await prisma.blogPost.findMany({
    orderBy: { date: 'desc' }
  });
}

export async function upsertNews(data: any) {
  const { id, ...rest } = data;
  const newsData = {
    ...rest,
    tags: JSON.stringify(rest.tags),
  };

  if (id) {
    await prisma.blogPost.update({
      where: { id },
      data: newsData
    });
  } else {
    await prisma.blogPost.create({
      data: newsData
    });
  }
  revalidatePath('/admin/news');
  revalidatePath('/news');
}

export async function deleteNews(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath('/admin/news');
}

// Downloads
export async function getDownloads() {
  return await prisma.download.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function upsertDownload(data: any) {
  const { id, ...rest } = data;
  if (id) {
    await prisma.download.update({
      where: { id },
      data: rest
    });
  } else {
    await prisma.download.create({
      data: rest
    });
  }
  revalidatePath('/admin/downloads');
  revalidatePath('/downloads');
}

export async function deleteDownload(id: string) {
  await prisma.download.delete({ where: { id } });
  revalidatePath('/admin/downloads');
}

// Messages
export async function getMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateMessageStatus(id: string, status: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath('/admin/messages');
}

export async function createMessage(data: any) {
  await prisma.contactMessage.create({
    data: {
      ...data,
      status: 'new'
    }
  });
  revalidatePath('/admin/messages');
}

// Settings
export async function getSettings() {
  const settings = await prisma.setting.findMany();
  const settingsMap: any = {};
  settings.forEach(s => {
    settingsMap[s.key] = JSON.parse(s.value);
  });
  return settingsMap;
}

export async function updateSetting(key: string, value: any) {
  await prisma.setting.upsert({
    where: { key },
    update: { value: JSON.stringify(value) },
    create: { key, value: JSON.stringify(value) }
  });
  revalidatePath('/admin/settings');
}

// Users
export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isAdmin: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateUserRole(id: string, isAdmin: boolean) {
  await prisma.user.update({
    where: { id },
    data: { isAdmin }
  });
  revalidatePath('/admin/users');
}
