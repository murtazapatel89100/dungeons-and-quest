import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { constructMetadata, pageMetadata } from "@/../config/seo";


export const metadata: Metadata = constructMetadata(pageMetadata.privacy);

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="May 12, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
        <p>
          Dice & Codex is designed as a static utility for tabletop RPG players. We do not require users to create accounts, and we do not collect personal identification information (PII) such as names, email addresses, or physical addresses through the core functionality of the site.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Local Storage Usage</h2>
        <p>
          We use your browser's <strong>Local Storage</strong> to save your character sheets and preferences locally on your device. This data never leaves your computer and is not transmitted to our servers. Clearing your browser cache or site data will remove this information permanently.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. Analytical Data</h2>
        <p>
          We may use standard web logging and basic analytical tools to monitor site performance and traffic patterns. This data is anonymized and used solely to improve the user experience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
        <p>
          Our PDF generation service uses cloud-based processing. When you export a character sheet, the character data is sent to our API for processing and returned as a PDF. We do not store character data on our servers after the PDF has been generated.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
        <p>
          If you have questions about this policy, please contact us through the project's repository or community channels.
        </p>
      </section>
    </LegalPage>
  );
}
