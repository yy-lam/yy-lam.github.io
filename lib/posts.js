import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeMathjax from 'rehype-mathjax'
import rehypeStringify from 'rehype-stringify'

const postsDir = path.join(process.cwd(), 'pages/posts')
const isMarkdown = (fileName) => /\.md$/.test(fileName)

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs
    .readdirSync(postsDir)
    .filter(isMarkdown)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterRes = matter(fileContents)

    return {
      id,
      ...matterRes.data
    }
  })

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs
    .readdirSync(postsDir)
    .filter(isMarkdown)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterRes = matter(fileContents)

  // Use remark to convert markdown
    const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjax)
        .use(rehypeStringify)
    .process(await read(fullPath))
        //await remark().use(html).process(matterRes.content)
  const contentHtml = processedContent.toString()
  return {
    id,
    contentHtml,
    ...matterRes.data
  }
}
