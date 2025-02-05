const Panel = ({ header, text }: { header: string; text: string; }) => {
  return (
    <div className="p-8 bg-neutral-700  shadow-md transform">
      <h4 className="text-center border-b border-gray-800 pb-2">{header}</h4>
      <p>{text}</p>
    </div>
  );
}

export default Panel;
