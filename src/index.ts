#!/usr/bin/env node
// Shebang line to specify the script is to be executed using Node.js

import fs from 'fs'
import path from 'path'

const [action, inputFile, outputFolder] = process.argv.slice(2)

// Function to prepare the output directory
function prepareOutputDirectory(outputPath: string) {
  // Check if the output directory exists
  if (!fs.existsSync(outputPath)) {
    // recursive flag: create all parent directories if necessary
    fs.mkdirSync(outputPath, { recursive: true })
  }
}

// Function to read from the input file and extract odd-numbered lines
function readAndExtractOddLines(inputPath: string): string[] {
  try {
    // Read the entire file synchronously, assuming UTF-8 encoding
    const data = fs.readFileSync(inputPath, 'utf8')
    // Split the file content into an array of lines
    const lines = data.split('\n')
    // Returning lines in odd positions
    return lines.filter((line, index) => index % 2 === 0)
  } catch (error) {
    console.error(`Failed to read file: ${error.message}`)
    process.exit(1)
  }
}

// Function to write the extracted lines to the output file
function writeOutputFile(outputFilePath: string, lines: string[]) {
  try {
    // Write the array of lines to the file, joining them with newline characters
    fs.writeFileSync(outputFilePath, lines.join('\n'))

    console.log(`File generated successfully at ${outputFilePath}`)
  } catch (error) {
    console.error(`Failed to write file: ${error.message}`)
    process.exit(1)
  }
}

// Main function that orchestrates the script execution
function main() {
  if (action !== 'generate') {
    console.log('Invalid action. Use "generate" to process files.')
    return
  }

  const inputPath = path.resolve(inputFile) // Get the absolute path for source txt file
  const outputPath = path.resolve(outputFolder) // Get the absolute path for the result.txt
  const outputFilePath = path.join(outputPath, 'result.txt') // Construct the full path for result.txt

  prepareOutputDirectory(outputPath)
  const oddLines = readAndExtractOddLines(inputPath)
  writeOutputFile(outputFilePath, oddLines)
}

main()
