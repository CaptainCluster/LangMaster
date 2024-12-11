const Panel = ({ header, text }: { header: string; text: string; }) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg transform">
      <h4 className="text-center border-b border-gray-200 pb-2">{header}</h4>
      <p>{text}</p>
    </div>
  );
}

export default Panel;
