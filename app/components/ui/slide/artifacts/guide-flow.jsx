export default function GuideFlow({ path }) {
  return (
    <div className="relative w-full mb-13 md:-mb-1 md:w-[95%] mx-auto" style={{ paddingBottom: 'calc(53.22% + 44px)' }}> 
      <iframe
        src={`https://app.guideflow.com/embed/${path}`}
        width="100%"
        height="100%"
        style={{ overflow: "hidden", position: "absolute", border: "none" }}
        scrolling="no"
        allow="clipboard-read; clipboard-write"
        allowFullScreen
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowtransparency="true"
        title="GuideFlow"
      ></iframe>
    </div>
  );
}