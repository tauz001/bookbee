/**
 * Privacy Policy Page for BookBee
 */
import React from 'react';
import Card from '../../components/common/Card';

const PrivacyPolicyPage = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "information-we-collect",
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Personal Information:",
          items: [
            "Name, email address, and phone number when you create an account",
            "Profile picture and other optional profile information",
            "Payment information (processed securely through third-party providers)",
            "Government-issued ID for verification purposes (hosts only)"
          ]
        },
        {
          subtitle: "Trip Information:",
          items: [
            "Trip details including pickup/drop locations, dates, and times",
            "Vehicle information for hosts (make, model, license plate)",
            "Booking history and preferences",
            "Reviews and ratings"
          ]
        },
        {
          subtitle: "Technical Information:",
          items: [
            "Device information (IP address, browser type, operating system)",
            "Location data (with your permission) to enhance trip matching",
            "Usage data and analytics to improve our services",
            "Cookies and similar tracking technologies"
          ]
        }
      ]
    },
    {
      id: "how-we-use-information",
      title: "2. How We Use Your Information",
      content: [
        {
          subtitle: "Service Provision:",
          items: [
            "Connect travelers with hosts for ride-sharing",
            "Process bookings and payments",
            "Provide customer support and resolve disputes",
            "Send trip confirmations and updates"
          ]
        },
        {
          subtitle: "Safety and Security:",
          items: [
            "Verify user identities and prevent fraud",
            "Monitor for suspicious activities",
            "Maintain platform safety and security",
            "Comply with legal requirements and law enforcement requests"
          ]
        },
        {
          subtitle: "Platform Improvement:",
          items: [
            "Analyze usage patterns to improve our services",
            "Develop new features and functionality",
            "Conduct research and analytics",
            "Send promotional communications (with your consent)"
          ]
        }
      ]
    },
    {
      id: "information-sharing",
      title: "3. Information Sharing and Disclosure",
      content: [
        {
          subtitle: "With Other Users:",
          items: [
            "Profile information (name, photo, ratings) with trip participants",
            "Contact information for confirmed bookings",
            "Trip-related communication through our platform",
            "Public reviews and ratings"
          ]
        },
        {
          subtitle: "With Service Providers:",
          items: [
            "Payment processors for secure transaction handling",
            "Cloud storage and hosting providers",
            "Analytics and marketing service providers",
            "Customer support and communication tools"
          ]
        },
        {
          subtitle: "Legal Requirements:",
          items: [
            "When required by law, court order, or government request",
            "To protect our rights, property, or safety",
            "In connection with business transfers or acquisitions",
            "To prevent fraud, abuse, or illegal activities"
          ]
        }
      ]
    },
    {
      id: "data-protection",
      title: "4. Data Protection and Security",
      content: [
        {
          subtitle: "Security Measures:",
          items: [
            "Encryption of sensitive data in transit and at rest",
            "Regular security assessments and updates",
            "Access controls and authentication protocols",
            "Secure data centers and infrastructure"
          ]
        },
        {
          subtitle: "Data Retention:",
          items: [
            "Account information retained until account deletion",
            "Trip data retained for 7 years for legal compliance",
            "Communication records retained for 2 years",
            "Anonymous analytics data may be retained indefinitely"
          ]
        }
      ]
    },
    {
      id: "your-rights",
      title: "5. Your Rights and Choices",
      content: [
        {
          subtitle: "Account Management:",
          items: [
            "Access and update your personal information",
            "Download your data in a portable format",
            "Delete your account and associated data",
            "Opt-out of promotional communications"
          ]
        },
        {
          subtitle: "Privacy Controls:",
          items: [
            "Control visibility of your profile information",
            "Manage location sharing preferences",
            "Choose communication preferences",
            "Block or report other users"
          ]
        }
      ]
    },
    {
      id: "cookies-tracking",
      title: "6. Cookies and Tracking Technologies",
      content: [
        {
          subtitle: "We use cookies and similar technologies for:",
          items: [
            "Essential site functionality and user authentication",
            "Remembering your preferences and settings",
            "Analytics to understand how you use our platform",
            "Advertising and marketing (with your consent)"
          ]
        },
        {
          subtitle: "Cookie Management:",
          items: [
            "You can control cookies through your browser settings",
            "Some features may not work if cookies are disabled",
            "Third-party cookies may be used for analytics and advertising"
          ]
        }
      ]
    },
    {
      id: "international-transfers",
      title: "7. International Data Transfers",
      content: [
        {
          subtitle: "",
          items: [
            "Your data may be transferred to and processed in countries other than India",
            "We ensure appropriate safeguards are in place for international transfers",
            "Data transfer agreements comply with applicable privacy laws",
            "Your rights remain protected regardless of processing location"
          ]
        }
      ]
    },
    {
      id: "children-privacy",
      title: "8. Children's Privacy",
      content: [
        {
          subtitle: "",
          items: [
            "BookBee is not intended for users under 18 years of age",
            "We do not knowingly collect information from children under 18",
            "Parents should monitor their children's internet usage",
            "Contact us if you believe we have collected a child's information"
          ]
        }
      ]
    },
    {
      id: "changes-policy",
      title: "9. Changes to This Policy",
      content: [
        {
          subtitle: "",
          items: [
            "We may update this privacy policy from time to time",
            "Material changes will be notified through the app or email",
            "Continued use of BookBee constitutes acceptance of changes",
            "Previous versions will be archived and available upon request"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 mb-2">
              How BookBee collects, uses, and protects your information
            </p>
            <p className="text-sm text-gray-500">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to BookBee! We are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, share, and protect your information when you use our ride-sharing platform.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using BookBee, you agree to the collection and use of information in accordance with this policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> This policy applies to all users of the BookBee platform, including both travelers and hosts. 
                  Please read this policy carefully and contact us if you have any questions.
                </p>
              </div>
            </div>
          </Card>

          {/* Table of Contents */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-yellow-600 hover:text-yellow-700 text-sm py-1 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </Card>

          {/* Privacy Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.id} id={section.id}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                
                <div className="space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      {subsection.subtitle && (
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          {subsection.subtitle}
                        </h3>
                      )}
                      <ul className="space-y-2">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></span>
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Get in Touch</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please don't hesitate to contact us:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> privacy@bookbee.com</p>
                  <p><strong>Phone:</strong> +91 95559 09575</p>
                  <p><strong>Address:</strong> BookBee Technologies Pvt. Ltd.<br />
                     Varanasi, Uttar Pradesh, India</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Response Time</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are committed to addressing your privacy concerns promptly:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    General inquiries: 24-48 hours
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    Data requests: 7-14 business days
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    Urgent matters: Within 24 hours
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12 py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              © 2025 BookBee Technologies Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This privacy policy is governed by the laws of India and any disputes will be subject to the jurisdiction of Indian courts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;