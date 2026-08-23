import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost("en", slug) ?? getPost("pt", slug);
  const title = post?.title ?? "Vidi Notes";
  const category = post?.category ?? "Journal";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070707",
          padding: "64px",
          color: "#f4efe6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#ffaa00",
          }}
        >
          <span>VIDI NOTES</span>
          <span>{category}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ width: 80, height: 4, background: "#ff7a00" }} />
          <div
            style={{
              fontSize: title.length > 42 ? 52 : 68,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#ff7a00" }}>ividi.dev · David Arsénio Martins</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
