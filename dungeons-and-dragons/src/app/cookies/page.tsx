import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { constructMetadata, pageMetadata } from "@/../config/seo";


export const metadata: Metadata = constructMetadata(pageMetadata.cookies);

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Settings" lastUpdated="May 12, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. What are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device by your browser. They are commonly used to remember preferences and session data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Essential Cookies & Local Storage</h2>
        <p>
          Dice & Codex primarily uses <strong>Local Storage</strong> instead of traditional cookies. This is essential for the following site functions:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-[#9CA3AF]">
          <li>Storing character sheet data created in the character builder.</li>
          <li>Remembering your UI preferences (e.g., active tabs).</li>
          <li>Facilitating the PDF export process.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Cookies</h2>
        <p>
          We do not currently use any third-party tracking or advertising cookies. Any external links (such as to Wizards of the Coast or reference sites) may set their own cookies upon visiting those external domains.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. How to Manage Your Data</h2>
        <p>
          Because we use Local Storage, you have full control over your data:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-[#9CA3AF]">
          <li><strong>Clearing Site Data:</strong> You can clear all character data by using your browser's "Clear Site Data" or "Clear History" options.</li>
          <li><strong>Incognito Mode:</strong> Using the site in Private or Incognito mode will ensure that all data is deleted once you close your browser tab.</li>
        </ul>
      </section>
    </LegalPage>
  );
}
