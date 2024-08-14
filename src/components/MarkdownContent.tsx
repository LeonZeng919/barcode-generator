import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-sm dark:prose-invert sm:prose lg:prose-lg xl:prose-xl prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-gray-800 prose-pre:bg-gray-100 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300 dark:prose-a:text-blue-400 dark:prose-strong:text-gray-100 dark:prose-code:text-gray-200 dark:prose-pre:bg-gray-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
