// console.log(process.env)
import nextMDX from '@next/mdx';
import { remarkCodeHike } from '@code-hike/mdx';
import { remarkMdxToc } from 'remark-mdx-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import theme from "shiki/themes/dracula.json" assert { type: "json" };
// import './src/env.mjs';

const withMDX = nextMDX({
  options: {
    remarkPlugins: [
      [remarkCodeHike, { theme, showCopyButton: true }],
      remarkMdxToc,
    ],
    rehypePlugins: [
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        properties: {
          className: ['anchor']
        },
      }],
      rehypeSlug
    ],
    extension: /\.mdx?$/,
    providerImportSource: '@mdx-js/react'
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  transpilePackages: ['ui'],
  poweredByHeader: false,
  images: {
    domains: ['kitwind.io']
  },
  swcMinify: true,
}

export default withMDX(nextConfig)
