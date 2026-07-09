// src/app/api/gallery-images/route.ts
//
// Returns a JSON list of image filenames from /public/projects/gallery/
// so the GraphicDesignPanel can load them dynamically without any hardcoding.
//
// Drop images into /public/projects/gallery/ — they appear automatically.
// Supported: .jpg .jpeg .png .webp .avif .gif

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'projects', 'gallery');
const SUPPORTED   = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

export async function GET() {
  try {
    // Create the directory if it doesn't exist yet so the component
    // shows an empty state rather than a server error.
    if (!fs.existsSync(GALLERY_DIR)) {
      fs.mkdirSync(GALLERY_DIR, { recursive: true });
    }

    const files = fs
      .readdirSync(GALLERY_DIR)
      .filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return SUPPORTED.has(ext) && !f.startsWith('.');
      })
      .sort(); // alphabetical — rename files with leading numbers to control order

    return NextResponse.json({ files }, {
      headers: {
        // Revalidate every 60 s so adding an image shows up quickly
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });
  } catch (err) {
    console.error('[gallery-images]', err);
    return NextResponse.json({ files: [] }, { status: 200 });
  }
}