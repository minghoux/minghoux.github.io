'use strict';
const {
  Document, Packer, Paragraph, TextRun, ImageRun,
  HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  BorderStyle, ShadingType, WidthType,
  Header, Footer, PageNumber,
  TextWrappingType,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
  PageBreak, convertMillimetersToTwip,
  LineRuleType, TabStopType,
} = require('docx');
const JSZip = require('jszip');
const fs   = require('fs');
const path = require('path');

const BASE  = 'C:\\Users\\MingHo\\OneDrive - Fintern\\Documents\\Fintern Design\\abound-brand-2026';
const BRAND = path.join(BASE, 'brand-assest');

const coverBg  = fs.readFileSync(path.join(BRAND, 'abstract-2.jpg'));
const wordmark = fs.readFileSync(path.join(BRAND, 'wordmark.png'));

const C = {
  forestGreen : '0E4533',
  charcoal    : '201F1D',
  offWhite    : 'F4F8F3',
  tealSage    : 'B8DCD2',
  midGrey     : '475467',
  lightGrey   : 'D0D5DD',
  captionGrey : '667085',
  white       : 'FFFFFF',
};

const PAGE_W   = 11906;
const PAGE_H   = 16838;
const MARGIN   = convertMillimetersToTwip(25);
const USABLE_W = PAGE_W - MARGIN * 2;
const SAANS    = 'Saans';
const CALIBRI  = 'Calibri';
const LOGO_R   = 220 / 800;
const BG_W = 794, BG_H = 1123;
const HDR_LOGO_W = 113, HDR_LOGO_H = Math.round(HDR_LOGO_W * LOGO_R);
const CVR_LOGO_W = 170, CVR_LOGO_H = Math.round(CVR_LOGO_W * LOGO_R);

// ─── STYLES ──────────────────────────────────────────────────────────────────
const customStyles = {
  default: {
    document: {
      run: { font: CALIBRI, size: 22, color: C.charcoal },
      paragraph: { spacing: { line: 331, lineRule: LineRuleType.AUTO } },
    },
  },
  paragraphStyles: [
    {
      id: 'Heading1', name: 'heading 1',
      basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { font: SAANS, size: 48, bold: true, color: C.forestGreen },
      paragraph: {
        spacing: { before: 480, after: 160, line: 276, lineRule: LineRuleType.AUTO },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.tealSage, space: 4 } },
      },
    },
    {
      id: 'Heading2', name: 'heading 2',
      basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { font: SAANS, size: 36, bold: true, color: C.charcoal },
      paragraph: { spacing: { before: 320, after: 120, line: 276, lineRule: LineRuleType.AUTO } },
    },
    {
      id: 'BodyText', name: 'Body Text',
      basedOn: 'Normal', next: 'BodyText',
      run: { font: CALIBRI, size: 22, color: C.charcoal },
      paragraph: { spacing: { before: 0, after: 160, line: 331, lineRule: LineRuleType.AUTO } },
    },
    {
      id: 'CaptionText', name: 'Caption Text',
      basedOn: 'Normal', next: 'Normal',
      run: { font: CALIBRI, size: 18, italics: true, color: C.captionGrey },
      paragraph: { spacing: { before: 60, after: 120, line: 240, lineRule: LineRuleType.AUTO } },
    },
    {
      id: 'Callout', name: 'Callout',
      basedOn: 'Normal', next: 'Normal',
      run: { font: CALIBRI, size: 22, color: C.charcoal },
      paragraph: {
        indent: { left: convertMillimetersToTwip(8) },
        spacing: { before: 160, after: 200, line: 331, lineRule: LineRuleType.AUTO },
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.offWhite },
        border: { left: { style: BorderStyle.SINGLE, size: 24, color: C.tealSage, space: 8 } },
      },
    },
  ],
};

// ─── HEADER / FOOTER ─────────────────────────────────────────────────────────
function makeHeader() {
  return new Header({
    children: [
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.forestGreen, space: 4 } },
        tabStops: [{ type: TabStopType.RIGHT, position: USABLE_W }],
        children: [
          new ImageRun({ data: wordmark, transformation: { width: HDR_LOGO_W, height: HDR_LOGO_H }, type: 'png' }),
          new TextRun({ text: '\tComplaints Handling Policy and Procedure', font: CALIBRI, size: 18, italics: true, color: C.midGrey }),
        ],
      }),
    ],
  });
}

function makeFooter() {
  return new Footer({
    children: [
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.tealSage, space: 4 } },
        tabStops: [{ type: TabStopType.RIGHT, position: USABLE_W }],
        children: [
          new TextRun({ text: 'Abound  |  Confidential', font: CALIBRI, size: 18, color: C.captionGrey }),
          new TextRun({ text: '\tPage ', font: CALIBRI, size: 18, color: C.captionGrey }),
          new TextRun({ children: [PageNumber.CURRENT], font: CALIBRI, size: 18, color: C.captionGrey }),
          new TextRun({ text: ' of ', font: CALIBRI, size: 18, color: C.captionGrey }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: CALIBRI, size: 18, color: C.captionGrey }),
        ],
      }),
    ],
  });
}

// ─── COVER ───────────────────────────────────────────────────────────────────
function makeCover() {
  return [
    new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [
        new ImageRun({
          data: coverBg,
          transformation: { width: BG_W, height: BG_H },
          type: 'jpg',
          floating: {
            horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
            verticalPosition:   { relative: VerticalPositionRelativeFrom.PAGE,   offset: 0 },
            wrap: { type: TextWrappingType.NONE },
            behindDocument: true, allowOverlap: true, lockAnchor: true,
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
          },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: convertMillimetersToTwip(8), after: 0 },
      children: [
        new ImageRun({ data: wordmark, transformation: { width: CVR_LOGO_W, height: CVR_LOGO_H }, type: 'png' }),
      ],
    }),
    new Paragraph({ spacing: { before: convertMillimetersToTwip(110), after: 0 }, children: [new TextRun('')] }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: convertMillimetersToTwip(4) },
      children: [new TextRun({ text: 'Complaints Handling', font: SAANS, size: 72, bold: true, color: C.charcoal })],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: convertMillimetersToTwip(4) },
      children: [new TextRun({ text: 'Policy and Procedure', font: SAANS, size: 56, bold: true, color: C.charcoal })],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: convertMillimetersToTwip(3) },
      children: [new TextRun({ text: 'Version 5.0 Draft', font: SAANS, size: 32, color: C.forestGreen })],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: 'Confidential and Proprietary', font: CALIBRI, size: 22, color: C.forestGreen })],
    }),
  ];
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function body(text) {
  return new Paragraph({ style: 'BodyText', children: [new TextRun(text)] });
}
function h1(text) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] }); }
function h2(text) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }
function gap(mm) { return new Paragraph({ spacing: { before: convertMillimetersToTwip(mm), after: 0 }, children: [new TextRun('')] }); }
function callout(label, text) {
  return new Paragraph({
    style: 'Callout',
    children: [
      new TextRun({ text: label + '  ', font: CALIBRI, bold: true }),
      new TextRun({ text, font: CALIBRI }),
    ],
  });
}
function bullets(items, level = 0) {
  return items.filter(t => t.trim()).map(text =>
    new Paragraph({ bullet: { level }, style: 'BodyText', children: [new TextRun(text)] })
  );
}

// ─── VERSION HISTORY TABLE ───────────────────────────────────────────────────
function versionTable() {
  const headers = ['Version', 'Date', 'Author', 'Reviewed by', 'Approved by', 'Approved Date', 'Comments'];
  const rows = [
    ['1.1', '12/05/2020', 'Ni Li (CPO)', 'Jourdain Tambo (TCC)', '', '30/05/2020', 'First Draft'],
    ['1.2', '02/06/2020', 'Ni Li (CPO)', 'Alan Cathcart (CCO)', '', '05/06/2020', 'First Review'],
    ['1.3', '08/06/2020', 'Ni Li (CPO)', 'Alan Cathcart (CCO)', '', '10/06/2020', 'Second Review'],
    ['1.4', '11/06/2020', 'Alan Cathcart (CCO)', 'Jourdain Tambo (TTC)', 'Operating Committee', '12/06/2020', 'New Policy'],
    ['1.0', '16/11/2020', 'Alan Cathcart (CCO)', 'Operating Committee', 'Operating Committee', '16/11/2020', 'Final'],
    ['2.0', '11/7/2022', 'Alan Cathcart (CCO)', 'Jacob Parker', 'Operating Committee', '26/7/2022', 'Final'],
    ['3.0', '05/04/2023', 'Claire Belsham (Compliance Officer)', 'Alan Cathcart (CCO)', 'Gerald Chappell (CEO)', '21/7/2023', 'Addition of Consumer Duty. Introductory information on AISP requirements.Addition of a Policy owner. Updates to appendix 1'],
    ['4.0', '09/09/2024', 'Claire Belsham (Compliance Officer)Jacob Parker (Head of Credit Operations)', 'Alan Cathcart (CCO)', 'Gerald Chappell (CEO)', '01/11/2024', 'Annual review + addition of embedded lending requirements'],
    ['5.0', 'Draft', '', '', '', '', ''],
  ];

  const ws = [
    Math.floor(USABLE_W * 0.07),
    Math.floor(USABLE_W * 0.09),
    Math.floor(USABLE_W * 0.17),
    Math.floor(USABLE_W * 0.14),
    Math.floor(USABLE_W * 0.14),
    Math.floor(USABLE_W * 0.09),
  ];
  ws.push(USABLE_W - ws.reduce((a, b) => a + b, 0));

  function hCell(text, w) {
    return new TableCell({
      width: { size: w, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.forestGreen },
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text, font: CALIBRI, size: 18, bold: true, color: C.white })] })],
    });
  }
  function dCell(text, w, fill) {
    return new TableCell({
      width: { size: w, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill },
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text, font: CALIBRI, size: 18, color: C.charcoal })] })],
    });
  }

  return new Table({
    width: { size: USABLE_W, type: WidthType.DXA },
    columnWidths: ws,
    borders: {
      top:     { style: BorderStyle.NONE, size: 0, color: 'auto' },
      bottom:  { style: BorderStyle.NONE, size: 0, color: 'auto' },
      left:    { style: BorderStyle.NONE, size: 0, color: 'auto' },
      right:   { style: BorderStyle.NONE, size: 0, color: 'auto' },
      insideH: { style: BorderStyle.SINGLE, size: 2, color: C.lightGrey },
      insideV: { style: BorderStyle.NONE,   size: 0, color: 'auto' },
    },
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => hCell(h, ws[i])) }),
      ...rows.map((row, ri) =>
        new TableRow({ children: row.map((cell, ci) => dCell(cell, ws[ci], ri % 2 === 0 ? C.white : C.offWhite)) })
      ),
    ],
  });
}

// ─── DOCUMENT BODY ───────────────────────────────────────────────────────────
function makeBody() {
  return [

    // ── 1. PURPOSE ───────────────────────────────────────────────────────────
    h1('1. Purpose'),
    body('This policy applies directly to Fintern Ltd.  It covers all consumer credit activities under the trading names of \u2018Fintern\u2019 and \u2018Abound\u2019 and applies to all staff employed by Fintern Ltd.'),
    body('This document is to be used by all Fintern\u2019s staff who interact with customers and who can potentially receive customer complaints. This paper provides a written framework to assist all relevant staff identify customer complaints and deal with such in accordance with the policies and procedures set out herein.'),
    body('The policy will be further reviewed and updated in line with changes to our activities, namely following an application to conduct Account Information Service Provider (AISP) activities by Fintern Ltd or another member of the Fintern Group and extended to other entities in the Group as needed.'),
    pb(),

    // ── 2. REGULATORY REQUIREMENTS ──────────────────────────────────────────
    h1('2. Regulatory Requirements'),
    body('The Financial Conduct Authority (FCA) requires Fintern to have internal procedures for the reasonable and prompt handling of complaints.  The content of this policy and procedures has been designed in accordance with the FCA\u2019s Principles for Businesses (PRIN), Treating Customers Fairly (TCF) outcomes and the Dispute Resolution Handbook (DISP) as noted below. Activities under the AISP arm will be subject to all of the below, with additional requirements set out by the Payment Services Regulations 2017 (PSR). The policy is duly noted where requirements differ under the AISP arm.'),

    h2('High Level Standards'),
    body('Principle 6 of the FCA\u2019s Principles for Businesses requires the Fintern to treat customers fairly.'),
    body('Principle 12 mandates firms to act to deliver good customer outcomes for retail customers, as set out within the Consumer Duty.'),
    body('TCF Outcome 6 requires Fintern to ensure that customers do not experience any post-sale barriers such as experiencing difficulties in making complaints.'),

    h2('DISP'),
    body('The FCAs Dispute Resolution Handbook provides rules and guidance on complaint handling, resolution and escalation requirements. This includes permitted timeframes, the provision of information to complainants, investigations requirements, record keeping, and dealing with the regulator and the Financial Ombudsman.'),

    h2('PSR'),
    body('In preparation for Fintern\u2019s regulatory application to undertake activities as an Account Information Service Provider (AISP), we note that there are some differences in the dispute resolution requirements to those of the consumer credit activities. Section 101 of the PSRs includes requirements on resolution timeframes and the provision of providers of dispute resolution services.'),

    h2('Consumer Duty'),
    body('The FCA introduced the Consumer Duty with effect from 31 July 2023. The new Duty was designed to further promote good outcomes for customers, whilst mitigating detriment where possible.'),
    body('The duty compromises of:'),
    ...bullets(['A Consumer Principle setting out the COCON rule \u2018You must act to deliver good outcomes for retail customers\u2019']),
    ...bullets(['Cross Cutting Rules']),
    ...bullets([
      'Act in good faith towards retail customers',
      'Avoid causing foreseeable harm',
      'Enable and support customers to pursue their financial objectives',
    ], 1),
    ...bullets(['Four Outcomes']),
    ...bullets([
      'Design and suitability of products and services',
      'Price and value',
      'Customer Understanding',
      'Customer Support',
    ], 1),

    body('What this means for Fintern:'),
    ...bullets([
      'We need to be able to understand our characteristics and behaviours of our customers and target market, and ensure that our products meet those needs accordingly',
      'Our customers should be able to understand the nature of our product. Information should be widely available and written in a way that customers can understand. There should be no \u2018surprises\u2019 in terms of features, restrictions or fees',
      'Our customers should be able to speak to us in a way that suits them \u2013 e.g. by telephone or in writing such as email or through live chat',
      'Our products should demonstrate value and be priced accordingly. There should be no hidden fees or charges',
      'We should have the facility to monitor our adherence to the duty, such as through MI, quality assurance and customer feedback',
      'Ultimately, we should put customer interests and positive customer outcomes at the heart of everything that we do',
    ]),

    body('Consumer Duty should be at the heart of everything that we do, and therefore the spirit of the Duty is woven throughout the requirements of this policy. There are however aspects of the Duty which are aligned to complaints handling, more specifically:'),
    ...bullets([
      'Taking time to fully understand the complaint',
      'Remediating the customer (where required)',
      'Making changes to practices if detriment identified',
      'Adhering to complaints timeframes',
    ]),

    ...bullets(['Further to the above, we have sought to determine what positive customer outcomes looks like to us:']),
    ...bullets([
      'Customers obtain loans that are suited to their needs and circumstances and which are affordable.',
      'Customer receive good value for money in terms of the interest rate, fees and overall cost of the loans that we provide',
      'Customers understand the loans that they have applied for or that they have entered into.   This includes the cost of the loan, the features available to help them manage the loan, and the consequence of not making their repayments.',
      'Customers are offered support as needed during the life cycle of loan, from application through to final repayment.  Where customers fall into financial difficulties, that they are provided with tailored forbearance strategies as needed.  Vulnerable customers are identified and are supported in way that are appropriate to their vulnerability.',
    ]),
    pb(),

    // ── 3. DEFINITION OF AN ELIGIBLE COMPLAINT ───────────────────────────────
    h1('3. Definition of an Eligible Complaint'),
    body('An eligible complaint is a complaint which should be handled in accordance with the policies and procedures set out in this document. There are two components that determine whether a complaint is an eligible complaint, namely (1) the complaint must satisfy the definition in paragraph 3.1 below and (2) the complaint must be made by an eligible complainant.'),

    h2('3.1 Definition of a Complaint'),
    body('An eligible complaint is defined by the FCA as \u201cany oral or written expression of dissatisfaction, whether justified or not, from, or on behalf of a customer or potential customer about the provision of, or failure to provide, a financial service which alleges that the complainant has suffered (or may suffer) financial loss, material distress or material inconvenience and relates to an activity of Fintern or any other organisation that Fintern has some connection to in marketing or providing financial services or products.\u201d'),
    body('In other words, a complaint is any expression of dissatisfaction about the provision of Fintern\u2019s consumer credit activities, including embedded lending, whether justified or not.'),

    h2('3.2 Eligible Complaint'),
    body('In order for a complaint to be an eligible complaint it must be made by an eligible complainant. An eligible complainant can be a consumer (i.e. a natural person acting for purposes outside his trade, business, or profession).'),
    body('Fintern only provides its regulated products and/or services to consumers and therefore all of its customers are potentially eligible complainants. In light of this, all complaints that fall within the definition set out in paragraph 3.1 above that are made by the Fintern\u2019s customers are eligible complaints that should be handled according to the policies and procedures set out in this document.'),
    body('It is to be noted that reference to a customer includes a potential customer.'),
    body('Fintern also facilitates embedded lending for our Render clients. Where an embedded lending customer makes a complaint aligned to the loan aspect of their product, it falls within the definition above and will be handled by Fintern. More information can be found in section 11.'),

    h2('3.3 Non-Reportable Complaints'),
    body('A client with a non-reportable complaint does NOT have the right to refer their complaint to the Financial Ombudsman Service.'),
    ...bullets([
      'Complaints made by non-eligible complainants are classed as non-reportable. For example, should we receive a complaint from the customer\u2019s bank account provider relating to our use of Open Banking; and',
      'Any complaint that does not involve an allegation that the complainant has suffered, or may suffer, financial loss, material distress or material inconvenience is non-reportable as it does not fall into the definition of a complaint.',
    ]),
    body('Fintern aims to treat all complainants fairly and reasonably. Non-reportable complaints shall be dealt with in the same manner as reportable complaints, except for the fact that we are unable to refer the clients to the Financial Ombudsman Service.'),
    body('Under section 101 of the PSR, we are required to provide details of one or more providers of dispute resolution services who are able to deal with disputes concerning the rights and obligations set out by the Regulations in respect of AISP activities.'),
    pb(),

    // ── 4. MEANS OF MAKING A COMPLAINT ───────────────────────────────────────
    h1('4. Means of Making a Complaint'),

    h2('4.1 How to Make a Complaint'),
    body('Customers can make complaint by:'),
    ...bullets([
      'Telephone: 020 3443 8881 or 012 7144 4027 for Collections-related complaints',
      'Email: complaints@getabound.com or contact@getabound.com',
      'Through the contact us section on the website',
      'Live Chat',
      'Responding to SMS',
      'Where a complaint is made via one of our Render clients, the relevant elements of the complaint (e.g. anything relating to the loan) will be forwarded to us as per the DISP complaint forwarding rules',
    ]),

    h2('4.2 Confidentiality'),
    body('All complaints received will be dealt with confidentially and in accordance with the requirements of the Data Protection Act 2018 and the General Data Protection Regulation, subject to the need to disclose information as required by statutory authorities, and/or as a result of statutory, legal or parliamentary obligations placed on the Commission.'),

    h2('4.3 Complaint Handling Standard'),
    body('The complaints procedure is intended to ensure that all complaints are handled fairly, consistently and wherever possible resolved to the complainant\u2019s satisfaction.'),
    body('Fintern will not treat our customers less favourably than anyone else because of their:'),
    ...bullets(['Disability', 'Mental health issue', 'Colour or race: this includes ethnic or national origin or nationality', 'Any other unjustifiable factors, for example language difficulties, age']),
    body('We will, in accordance with Principle 6 (customers\u2019 interests) and to the extent that it applies, consider whether we ought to act with regard to the position of customers who may have suffered detriment from, or been potentially disadvantaged by, such problems but who have not complained and, if so, take appropriate and proportionate measures to ensure that those customers are given appropriate redress or a proper opportunity to obtain it. In particular, we will:'),
    ...bullets([
      'ascertain the scope and severity of the consumer detriment that might have arisen; and',
      'consider whether it is fair and reasonable for us to undertake proactively a redress or remediation exercise, which may include contacting customers who have not complained.',
    ]),
    pb(),

    // ── 5. TIME BARRED COMPLAINTS ────────────────────────────────────────────
    h1('5. Time Barred Complaints'),
    body('If the complaint is time barred Fintern will notify the complainant in writing. Fintern may reject the event that is:'),
    ...bullets([
      'the subject of the complaint occurred more than six years after the events complained about or',
      '(if later) more than three years from the date the complainant became aware (or ought reasonably to have become aware) that he/she had cause for complaint.',
    ]),
    body('However, where there are exceptional circumstances surrounding the customer\u2019s delay (e.g. the customer having been incapacitated for a period of time), we will consider dealing with such complaints.'),

    // ── 6. COMPLAINTS AWARENESS ──────────────────────────────────────────────
    h1('6. Complaints Awareness'),
    body('Fintern makes consumers aware of its internal complaint handling procedure by publishing guidance:'),
    ...bullets([
      'Within the Loan Agreement (the terms and conditions)',
      'Within the Pre-Contract Credit Information (PCCI) document',
      'On www.getabound.com on the designated complaints page within the \u2018help\u2019 section and within the FAQs',
    ]),
    body('Please see Annex 1 for a copy of the Fintern\u2019s complaints procedure to share with consumers.'),

    // ── 7. COMPLAINTS ACKNOWLEDGEMENT ────────────────────────────────────────
    h1('7. Complaints Acknowledgement'),
    body('Fintern endeavours to send complainants a written acknowledgement of complaints within 5 business days of the receipt of the complaint. The acknowledgement shall include:'),
    ...bullets([
      'Acknowledgment that the complaint has been received',
      'A reminder of the timescales for complaint resolution under DISP',
    ]),
    pb(),

    // ── 8. COMPLAINTS INVESTIGATION ──────────────────────────────────────────
    h1('8. Complaints Investigation'),
    body('Fintern will ensure that new customer-facing staff members receive training regarding its internal complaint handling procedure during their induction training. Upon receiving the complaints, each complaint will be logged into our Complaints Log by the assigned case handler with the following information:'),
    ...bullets([
      'Customer Details',
      'Date/ the complaint was received',
      'Issue Categories',
      'Issue Descriptions',
      'Acknowledgement Date',
      'Case Handler',
      'Assigned Date',
      'Any correspondence relating to the complaint, including details of any redress offered by the firm',
      'Action Taken',
      'Associated costs e.g. GOGW',
      'Issue Close Date',
      'Time spent to close the issue',
      'FOS referral',
    ]),
    body('We aim to resolve complaints and send a response within three working days of receiving each complaint. If for any reason the complaint takes longer than three working days to resolve, we will keep our customers informed of our investigation progress by the end of the fourth working day following receipt.'),
    body('We aim to complete our investigation into all complaints received about our service and provide a final written response within eight weeks. However, in a limited number of cases \u2013 for example, if a complaint is very complex or requires further breakdown \u2013 it may be necessary to extend the time limit to ensure we have all the information needed to deal with it. If this is the case, we will keep the customer informed of progress with the investigation, the reasons for the delay, and inform the customer about their right to refer the complaint to the Financial Ombudsman Service by the eight weeks since our receipt of the same.'),
    pb(),

    // ── 9. COMPLAINTS RESOLUTION ─────────────────────────────────────────────
    h1('9. Complaints Resolution'),

    h2('9.1 Final Response'),
    body('Once the investigation is concluded, Fintern will endeavour to issue a final written response to the complaint within 8 weeks from the receipt of the complaint.'),
    body('Fintern\u2019s final response will set out:'),
    ...bullets(['Details of the complaint', 'Details of the resolution to the complaint.  Resolution may consist of:']),
    ...bullets([
      'Uphold the complaint and, where appropriate, offer redress or remedial action;',
      'Offer redress or remedial action without upholding the complaint; or',
      'Reject the complaint and give reasons for doing so.',
    ], 1),
    ...bullets([
      'In the unlikely event the complaint has not been resolved, what will happen next and the time scales',
      'For an eligible complaint,  explanation of the complainant\u2019s right to refer the complaint to the Financial Ombudsman Service should they subsequently be dissatisfied with the resolution and sets out the contact details of the Financial Ombudsman Service including its website',
    ]),
    body('Customers will be informed that they should wait until a Final Response is issued by Fintern before contacting the Financial Ombudsman Service. If Fintern is not in a position to issue a final response within eight weeks, the complainant will be provided with a written response explaining why we are not in a position to issue a final response and set out the date by which we expect to be able to issue one. At this point, complainants have the right to refer their complaint to the Financial Ombudsman Service should they choose to not wait beyond the eight-week timescale for the Firm to issue a final response.'),
    body('If the complaint is resolved by COB on the third working day, we will send a Summary Resolution Communication (SRC) as opposed to the Final Resolution Letter (FRL) required if the complaint is resolved after that date. At Fintern, we believe that it is important for customers to receive a full breakdown of the complaint outcome and the reasoning behind the decision. SRC\u2019s are intended to summarise the complaint in a shorter manner than a final response and are therefore not as complex.'),

    h2('9.2 Definition of a Closed Complaint'),
    body('A closed complaint is a complaint:'),
    ...bullets([
      'Where the firm has sent a final response; or',
      'Where the complainant has indicated in writing acceptance of the firm\u2019s earlier response.',
    ]),
    pb(),

    // ── 10. GOVERNANCE ───────────────────────────────────────────────────────
    h1('10. Governance'),

    h2('10.1 Approval'),
    body('Fintern\u2019s operations team will take the lead on responding to and investigating complaints and ensure all complaints are dealt with promptly and impartially (that is, in a fair and unbiased way). Each complaint resolution is subject to a \u2018four eyes\u2019 approach being written by a member of the Business Operations Team before being reviewed by the Business Operations Lead or Head of Credit of Operation before resolution is communicated.'),

    h2('10.2 Designated Complaints Handler'),
    body('Complaints are handled by the business operations team. An officer from the team will be appointed to handle the complaint from start to finish. They will take ownership of the assigned case and be the point of contact.'),
    body('Cases where the original decision maker is the subject of the complaint, an independent case handler will be assigned to provide an impartial and unbiased supports to the complainants.'),
    body('When handling complaints, the Business Operations team will take reasonable steps to ensure that they identify and remedies any recurring or systemic problems within the regulatory timescales, by:'),
    ...bullets([
      'Carefully logging and categorising complaints;',
      'Analysing the causes of individual complaints so as to identify root causes common to types of complaint;',
      'Identifying the frequency and trend of such complaint;',
      'Considering whether such root causes may also affect other processes or products, including those not directly complained of; and',
      'Correcting, where reasonable to do so, such root causes;',
      'Maintaining accurate records.',
    ]),
    body('The designated officer is also responsible for liaison with the FOS should the case be referred to the FOS.'),

    h2('10.3 Root Cause and Trend Analysis'),
    body('There is a Root Cause & Trends Analysis report in JIRA that can be viewed anytime by the Senior Management Team. This report updates immediately and can be reviewed using a specific link.The role of the RCA report is to give senior management visibility to (1) the common nature/subject matter of complaints received in the monthly period, (2) the common causes of the said complaints, (3) the outcome of the relevant complaints, (4) lessons learned or to be learned from the complaints and the outcomes, (5) corrective action taken or recommended to be taken to minimise recurrence and, for example, our compensation strategy to compensate customers that may be affected in the same manner as relevant complainants but who have not complained (e.g. the potential commissioning of a past business review).'),
    body('In preparing the RCA report, the complaints log data will be the primary source of data.  It may also be helpful to have regard to other data when compiling the report or performing analysis as to the root causes.  Where necessary this data will be supplemented with data from file reviews, customer communications history including chat logs, call recordings, correspondence and interviews with staff handling complaints.  Where relevant in determining root causes, it may also be helpful to have regard to complaints data reported by other lenders or the Financial Ombudsman Service, industry-level analysis undertaken and published by regulators, money advice charities or others, and media reporting on complaints.'),

    h2('10.4 Financial Ombudsman Service Past Decisions'),
    body('Fintern\u2019s operations team will track and record complaints that are referred to and addressed by the FOS, and report to the Chief Operations Officer on a weekly basis. The report will include past FOS decisions (inclusive of FOS past decisions relating to the Fintern\u2019s complaints and FOS past decisions relating to similar products and services to those offered by Fintern) in order for the committee to assess and address the potential risks.'),

    h2('10.5 Second Line Assurance'),
    body('Fintern\u2019s Chief Compliance Officer (CCO) oversees firm\u2019s compliance with DISP 1 and handle the second line Compliance assurance testing of the complaints handling policy and procedure, they may also co-operate with other functions within Fintern such as the Risk team and Product team. The testing will be carried out on a bi-monthly basis to address the recurring or systemic problems and effectiveness of the complaint handling process. The assurance testing will consist of reviewing Fintern\u2019s Complaints Log for the period and sample customer complaints files to check adherence to the policies and procedures set out in this document and the suitability of the outcomes achieved for the complainants.'),

    h2('10.6 Review'),
    body('Fintern\u2019s complaint handling policy and procedure will be reviewed by the Chief Compliance Officer on an annual basis and kept up to date and in compliance with the latest changes in legislation/ regulation. Any deficiencies in the policy and procedure will be discussed and action plan will be drawn up to address such deficiencies in the operating committee meetings. The review process will consist of the Chief Compliance Officer reviewing our policies and procedures, as documented herein, against relevant rules and guidance updates and publications from the FCA to identify any gaps against best practice and make changes to the same.'),
    pb(),

    // ── 11. EMBEDDED LENDING ─────────────────────────────────────────────────
    h1('11. Embedded Lending'),
    body('The below sets out our process for dealing with complaints aligned to our embedded lending activities (e.g. Gaia).'),
    ...bullets([
      'Complaints may be received by either the third party or by Fintern.  A complaint may relate to the loan, to the product offered by the third party, to the service provided or a mix of these.',
      'Each party will designate a person or an inbox as the contact person for complaints',
      'The party receiving the complaint should share the complaint with the other party\'s contact promptly, unless the complaint relates exclusively to the business of the party that receives the complaint.  Each party will assign their own complaint number to the case and share number.',
      'The two contact people should quickly agree which parts of a complaint should be address by which party. As a general rule, Fintern will address that part of complaints relating to lending, and the third party will address the part relating to the additional product provided (e.g. insurance/the service provided by the clinic for Gaia, or the auction sale by Spey).',
      'In practice, complaint issue may be bundled together and a clean split may not be possible.  A common sense allocation will need to be made depending on the preponderance of matters raising in a complaint.',
      'Each party will work to address the part of the complaint and respond individually to the customer, quoting both party\u2019s complaint number, and sharing draft complaint responses as needed and explaining to the customer which part of the complaint that they are addressing. It should be clear to the customer which entity is responding to which part of the complaint.',
      'Complaints may entail the customer providing sensitive information (i.e. special category data in terms of the GDPR).  Each party will work to ensure that such data is held securely and in line with GDPR requirement for such data.',
    ]),

    // ── 12. RECORD KEEPING ───────────────────────────────────────────────────
    h1('12. Record Keeping'),

    h2('12.1 Record Storage'),
    body('All eligible complaints, the investigation and resolution will be tracked and recorded in our within Jira. The record of will be retained in the English language.'),
    body('Every six months, we will publish data on customer complaints we have received for the previous half year;  this data will be published on our website to provide transparency to our customers and the same data will be provided to the FCA and may published by them on the FCA website if the number of complaints exceeds the threshold for publication. This data can be used as an indicator of how well we are serving our customers, for comparison purposes and also demonstrates the improvements we\'re making to reduce the number of complaints we receive.'),

    h2('12.2 Record Retention'),
    body('Fintern retains complaints records for minimum period of six years from the date a complaint was received, in order to appropriately investigate and defend claims that are made during the limitation period. That is six years after a cause of action or (if later) three years after the date on which a complainant/customer/former customer became aware (or ought reasonably to have become aware) that they had cause for a claim which determines whether a customer/former customer can lodge a legal claim against Fintern relating to a breach of contract or pursue a legal claim for negligence within the period set out in the Limitation Act 1980.'),
    body('However, Fintern will also take into account of the storage limitation principle under the GDPR which stipulates that personal data (i.e. records containing information capable of identifying an individual) be kept for no longer than is necessary for the purposes for which the personal data are processed. That is when the complaints are closed with satisfaction and the customers no longer have relationships with Fintern.'),
    pb(),

    // ── 13. POLICY OWNER ─────────────────────────────────────────────────────
    h1('13. Policy Owner'),
    body('This Policy is owned and managed by the Chief Operating Officer'),

    // ── 14. REVIEW AND VERSION HISTORY ───────────────────────────────────────
    h1('14. Review and Version History Log'),
    body('The complaint handling policy and procedure will be reviewed on an annual basis. The most up-to-date policy will be stored in Fintern internal \u201caccess controlled\u201d shared-drive, alongside the previous versions and important reference documents as well as a review log listing the following information:'),
    gap(4),
    versionTable(),
    pb(),

    // ── ANNEX 1 ──────────────────────────────────────────────────────────────
    h1('Annex 1 \u2013 Complaints Procedure to Share with Consumers'),
    body('We view complaints as a valuable source of customer feedback and an opportunity to identify how we can improve our service. We treat them seriously and investigate all complaints thoroughly and ensure they are fully addressed. We endeavour to provide you with an excellent customer service. However, we acknowledge that, at times, we may fail to meet your expectations. Should you be dissatisfied with our service, you can raise a complaint here. The quickest way to get in touch is by using our online form.Alternatively, you can use any of the methods below:'),
    body('Telephone:'),
    body('020 3443 8881'),
    body('Email:'),
    body('complaints@getabound.com'),
    body('By post:'),
    body('Abound, Fintern Ltd, 3rd Floor, 86-90 Paul Street, London, EC2A 4NE'),

    body('What do I do if I\'m not satisfied?'),
    body('\u200dWe will acknowledge that you have made a complaint promptly after receiving it.We try to resolve complaints as soon as possible. We aim to resolve most complaints by the third business day following the day on which we receive your complaint. If you are not happy with our response, you can escalate the complaint and the resolution to a senior member of staff via the same channels as above stating the case reference number.Should we resolve your complaint by the close of the third business day, we will issue you with a full written response acknowledging that you made a complaint and setting out that the complaint has been resolved and what our final response is, and making you aware of your right to refer the complaint to the Financial Ombudsman Service should you be dissatisfied with the resolution.If we are not able to resolve your complaint by the third business day, we will let you know promptly. Thereafter, we will investigate your complaint to reach a fair resolution. Please note that investigating your complaint may require us to contact you to obtain further information about it.If we need to take longer than three days to resolve your complaint, we will endeavour to issue you with a written final response within eight weeks.'),

    body('What options do I have?'),
    body('If you are not satisfied with our final response, you have the right to refer your complaint to the Financial Ombudsman Service (\'FOS\'). The FOS is an independent body established to settle disputes between UK-based financial companies and consumers free of charge. You can refer your complaint to the FOS on any of the below contact details:'),
    body('Telephone:'),
    body('Email:'),
    body('complaint.info@financial-ombudsman.org.uk'),
    body('https://www.financial -ombudsman.org.uk/contact-us/complain-online'),
    body('Post:'),
    body('Complain Online:'),
    body('0300 123 9 123 / 0800 023 4567'),
    body('Exchange Tower, Harbour Exchange Square, London, E14 9SR'),
    body('For the Financial Ombudsman to consider the complaint, it must be referred to them within 6 months of receiving our summary resolution communication or our final response. Information regarding the service can be found on the Financial Ombudsman website: https://www.financial-ombudsman.org.uk/publications/ordering-leaflet/leaflet'),
  ];
}

// ─── BUILD ────────────────────────────────────────────────────────────────────
async function build() {
  const doc = new Document({
    styles: customStyles,
    sections: [{
      properties: {
        titlePage: true,
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN, header: convertMillimetersToTwip(12), footer: convertMillimetersToTwip(12) },
        },
      },
      headers: {
        default: makeHeader(),
        first:   new Header({ children: [new Paragraph('')] }),
      },
      footers: {
        default: makeFooter(),
        first:   new Footer({ children: [new Paragraph('')] }),
      },
      children: [
        ...makeCover(),
        pb(),
        ...makeBody(),
      ],
    }],
  });

  let buffer = await Packer.toBuffer(doc);
  const zip = await JSZip.loadAsync(buffer);
  let settings = await zip.file('word/settings.xml').async('string');
  settings = settings.replace('</w:settings>', '<w:embedTrueTypeFonts/><w:embedSystemFonts/></w:settings>');
  zip.file('word/settings.xml', settings);
  buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  const out = path.join(BASE, 'document', '08. Abound Complaints Handling Policy and Procedure - v5.0.docx');
  fs.writeFileSync(out, buffer);
  console.log('\u2713 Written: ' + out);
  console.log('  Size: ' + (buffer.length / 1024).toFixed(1) + ' KB');
}

build().catch(err => { console.error(err); process.exit(1); });
