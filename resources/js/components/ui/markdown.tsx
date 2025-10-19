import ReactMarkdown from "react-markdown";
import React from "react";

export default function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0">
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
                        {children}
                    </h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-base font-medium text-gray-900 dark:text-white mt-3 mb-2">
                        {children}
                    </h4>
                ),
                h5: ({ children }) => (
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mt-2 mb-1">
                        {children}
                    </h5>
                ),
                h6: ({ children }) => (
                    <h6 className="text-xs font-medium text-gray-900 dark:text-white mt-2 mb-1">
                        {children}
                    </h6>
                ),
                p: ({ children }) => (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {children}
                    </p>
                ),
                a: ({ children, href }) => (
                    <a
                        href={href}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                        {children}
                    </a>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="ml-4">
                        {children}
                    </li>
                ),
                strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900 dark:text-white">
                        {children}
                    </strong>
                ),
                em: ({ children }) => (
                    <em className="italic text-gray-700 dark:text-gray-300">
                        {children}
                    </em>
                ),
                code: ({ children, className }) => {
                    const isInline = !className;
                    if (isInline) {
                        return (
                            <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm">
                                {children}
                            </code>
                        );
                    }
                    return (
                        <code className="block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre">
                            {children}
                        </code>
                    );
                },
                pre: ({ children }) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-x-auto">
                      {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-200 dark:border-blue-800 pl-4 italic text-gray-600 dark:text-gray-400 my-4">
                        {children}
                    </blockquote>
                ),
                hr: () => (
                    <hr className="my-8 border-gray-200 dark:border-gray-700" />
                ),
                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full h-auto rounded-lg shadow-sm my-4"
                    />
                ),
                table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
                            {children}
                        </table>
                    </div>
                ),
                thead: ({ children }) => (
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    {children}
                    </thead>
                ),
                tbody: ({ children }) => (
                    <tbody className="bg-white dark:bg-gray-900">
                    {children}
                    </tbody>
                ),
                tr: ({ children }) => (
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        {children}
                    </tr>
                ),
                th: ({ children }) => (
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                        {children}
                    </td>
                ),
                br: () => <br className="my-2" />,
            }}
        >
            {children}
        </ReactMarkdown>
    )
}
