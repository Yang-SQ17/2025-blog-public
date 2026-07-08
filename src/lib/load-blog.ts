import type { BlogConfig } from '@/app/blog/types'

export type { BlogConfig } from '@/app/blog/types'

export type LoadedBlog = {
	slug: string
	config: BlogConfig
	markdown: string
	cover?: string
}

/**
 * Load blog data from public/blogs/{slug}
 * Used by both view page and edit page
 */
export async function loadBlog(slug: string): Promise<LoadedBlog> {
	if (!slug) {
		throw new Error('Slug is required')
	}

	// Load config.json
	let config: BlogConfig = {}
	const configRes = await fetch(`/blogs/${encodeURIComponent(slug)}/config.json`)
	if (configRes.ok) {
		try {
			config = await configRes.json()
		} catch {
			config = {}
		}
	}

	// Load index.md
	const mdRes = await fetch(`/blogs/${encodeURIComponent(slug)}/index.md`)
	if (!mdRes.ok) {
		throw new Error('Blog not found')
	}
	let markdown = await mdRes.text()

	// 自动将相对路径图片转为绝对路径，避免部署后 404
	markdown = markdown.replace(/!\[([^\]]*)\]\(((?!https?:\/\/|\/|#)[^)]+)\)/g, (_, alt, path) => {
		const cleanPath = path.replace(/^\.\//, '')
		return `![${alt}](/blogs/${slug}/${cleanPath})`
	})

	return {
		slug,
		config,
		markdown,
		cover: config.cover
	}
}
