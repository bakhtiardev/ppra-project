# ppra-project: PPRA Compliance Companion
Welcome to the PPRA Compliance Companion, a powerful NLP-powered web application built with ReactJS+Vite (TypeScript). Our goal is to provide a user-friendly interface that allows clients to easily check the compliance of tender documents, particularly in PDF format, with just a few simple clicks.

## Objective and Problem Statement
Accessing and verifying tender documents against the rules set by the Public Procurement Regulatory Authority (PPRA) can be a time-consuming and laborious task. Extracting the required information from digital or handwritten documents and cross-referencing it with numerous PPRA rules can be overwhelming for humans. Therefore, we have automated this process and solved it using the power of Natural Language Processing (NLP) and Artificial Intelligence (AI).
The PPRA Compliance Companion application analyzes the user-uploaded unseen documents, performs various preprocessing steps, and extracts all relevant details. It then checks each extracted detail against the applicable rules and provides a comprehensive report on which rules have been violated and which have been adhered to.

## License
The PPRA Compliance Companion software is distributed under the terms of the **PPRA Compliance Companion Custom License**, Version 1.0. This license is a proprietary license that grants you the right to use the software solely for personal or internal purposes. It prohibits commercial use, distribution to third parties, modification, reverse engineering, and the creation of derivative works based on the software without prior written permission from Bakhtiar Hussain(@bakhtiardev), the licensor.

Additionally, this license explicitly restricts the use of the software, in whole or in part, to create research papers or academic publications. For more details on the terms and conditions of the license, please refer to the LICENSE(LICENSE) file in this repository.

For any inquiries regarding licensing, permissions, or other matters related to the software, please contact bakhtiarhussain123@gmail.com.

Please carefully review and understand the terms of the license before using the software. By using the PPRA Compliance Companion, you acknowledge your acceptance of and agreement to abide by the terms and conditions outlined in the license.

Bakhtiar Hussain
30-4-2023


## Project Composition
### NLP (Spacy)
To achieve the desired results, we leveraged Spacy, a well-known NLP module in Python, to perform numerous NLP operations and preprocessing techniques.
### Flask Framework
Our project is built using the Flask framework, which enables us to develop powerful REST APIs for server-side operations and data manipulation of the uploaded documents.
### ReactJS Vite with TypeScript
We developed the PPRA Compliance Companion using ReactJS with Vite, enhanced with TypeScript for an extra layer of type security. Additionally, we utilized the Redux Toolkit (RTK) for efficient state management throughout the application. To ensure secure user sessions and login data, we integrated Firebase authentication and authorization services.
### Database (NoSQL)
When it comes to fast data retrieval and communication between the client and server, Firebase is an invaluable service. Therefore, our project fully utilizes Firebase services, including authorization and authentication, to store and manage user data within the web application.
### Styling
We have implemented a visually appealing and user-friendly web design using Material UI (MUI), which adds an extra touch of elegance and enhances the overall user experience of the project.

Discover the power of the PPRA Compliance Companion and simplify the process of checking tender document compliance with ease. Let us assist you in navigating the complex landscape of PPRA rules and regulations.
