  
const DocumentItem = ({ title, description, link, pubDate }: { title: string; description: string; link: string; pubDate: string }) => (
  <div className="border-b border-gray-300 py-4">
    <div className='flex justify-between items-center'>

      <a href={link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-secondary hover:underline underline">
        {title}
      </a>
      <p className='text-xs text-neutral-600/70'>{new Date(pubDate).toLocaleDateString()}</p>
    </div>
    <p className='mt-2 text-base'>{description}</p>
    
  </div>
);

const DocumentList = ({ items }: { items: { title: string; description: string; fileUrl: string; pubDate: string }[] }) => {
  return (
    <div>
      {items.map((item) => (
        <DocumentItem
          key={item.title}
          title={item.title}
          description={item.description}
          link={item.fileUrl}
          pubDate={item.pubDate}
        />
      ))}
      {items.length === 0 && <p className='text-center text-neutral-600/70'>Nenhum documento encontrado.</p>}
    </div>
  )
}

export default DocumentList