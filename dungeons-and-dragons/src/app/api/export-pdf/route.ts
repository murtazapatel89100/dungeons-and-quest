import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const character = await req.json();

    if (!character) {
      return NextResponse.json(
        { error: "Character data is required" },
        { status: 400 },
      );
    }

    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });

    await page.evaluateOnNewDocument((charData) => {
      localStorage.setItem("dnd_character_sheet", JSON.stringify(charData));
      localStorage.setItem("is_pdf_export", "true");
    }, character);

    await page.goto(`${baseUrl}/characters/sheet`, {
      waitUntil: "networkidle0",
    });

    await page.evaluate(() => {
      // Inject printing styles
      const style = document.createElement('style');
      style.textContent = `
        header, footer, nav, 
        button, 
        .no-print-actions,
        .flex.overflow-x-auto.custom-scrollbar,
        .fixed.inset-0.z-0.pointer-events-none,
        .min-h-screen > .fixed.inset-0.z-0 {
          display: none !important;
        }
        
        /* Ensure the identity section and name are visible */
        .character-identity-section {
          display: flex !important;
          margin-top: 0 !important;
          padding-top: 20px !important;
        }

        main {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }

        .min-h-screen {
          padding-top: 0 !important;
          background-color: #0f1115 !important;
        }

        .max-w-\\[1400px\\] {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }

        /* Ensure content doesn't have unnecessary gaps at the top */
        .space-y-6 > :first-child {
          margin-top: 0 !important;
        }
      `;
      document.head.appendChild(style);
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        bottom: "10mm",
        left: "10mm",
        right: "10mm",
      },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${character.identity?.name || "character"}-sheet.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
