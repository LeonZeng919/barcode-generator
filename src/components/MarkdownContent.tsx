import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
