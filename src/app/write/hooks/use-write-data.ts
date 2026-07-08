import { useMemo } from 'react'
import dayjs from 'dayjs'
import { useWriteStore } from '../stores/write-store'

export function useWriteData() {
	const { form, images } = useWriteStore()

	// Replace local-image placeholders with preview URLs
	const processedMarkdown = useMemo(() => {
		let mdForPreview = form.md
		for (const img of images) {
			if (img.type === 'file') {
				const placeholder = `local-image:${img.id}`
				mdForPreview = mdForPreview.split(`(${placeholder})`).join(`(${img.previewUrl})`)
			}
		}
		// 自动将相对路径图片转为绝对路径（基于当前编辑的slug）
		if (form.slug) {
			mdForPreview = mdForPreview.replace(/!\[([^\]]*)\]\(((?!https?:\/\/|\/|#|blob:)[^)]+)\)/g, (_, alt, path) => {
				const cleanPath = path.replace(/^\.\//, '')
				return `![${alt}](/blogs/${form.slug}/${cleanPath})`
			})
		}
		return mdForPreview
	}, [form.md, images, form.slug])

	const title = form.title || 'Untitled'
	const date = dayjs(form.date).format('YYYY年 M月 D日')

	return {
		markdown: processedMarkdown,
		title,
		date
	}
}
