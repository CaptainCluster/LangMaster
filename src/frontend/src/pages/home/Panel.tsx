const Panel = ({ header, text }: { header: string; text: string; }) => {
  return (
    <div className="p-8 bg-neutral-700 rounded-lg shadow-lg transform">
      <h4 className="text-center text-white border-b border-gray-800 pb-2">{header}</h4>
      <p className="text-white">{text}</p>
    </div>
  );
}

export default Panel;
