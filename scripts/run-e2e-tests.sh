#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variable to track current test
current_test_file=""

# Handle interrupt signal (Ctrl+C)
handle_interrupt() {
    echo -e "\n${YELLOW}⚠️  Test execution interrupted by user${NC}"
    if [ -n "$current_test_file" ]; then
        echo ""
        echo -e "${YELLOW}Run this specific test to continue:${NC}"
        echo -e "${GREEN}maestro test $current_test_file${NC}"
        echo ""
    fi
    exit 130
}
trap handle_interrupt INT

# Check if Firebase emulators are running
echo -e "${BLUE}🔍 Checking Firebase emulators...${NC}"
if ! lsof -i :9099 > /dev/null 2>&1 || ! lsof -i :8080 > /dev/null 2>&1 || ! lsof -i :5001 > /dev/null 2>&1; then
    echo -e "${RED}❌ Firebase emulators are not running${NC}"
    echo -e "${YELLOW}Please start the emulators first:${NC}"
    echo -e "${GREEN}npm run firebase${NC}"
    echo ""
    exit 1
fi
echo -e "${GREEN}✅ Firebase emulators detected${NC}"
echo ""

# Automatically discover all e2e test files
test_files=($(find tests/e2e -name "*.yaml" -type f | sort))

echo -e "${BLUE}🧪 Running E2E Tests...${NC}"
echo ""

# Counter for test results
total_tests=${#test_files[@]}
passed_tests=0

# Timing variables
total_start_time=$(date +%s)
total_start_time=$((total_start_time * 1000))

# Run each test file
for test_file in "${test_files[@]}"; do
    current_test_file="$test_file"
    test_name=$(basename "$test_file" .yaml)
    echo -e "${YELLOW}Running: $test_name${NC}"
    
    # Start timing for this test
    test_start_time=$(date +%s)
    test_start_time=$((test_start_time * 1000))
    
    # Run the test and capture exit code
    if maestro test "$test_file" > /dev/null 2>&1; then
        test_end_time=$(date +%s)
        test_end_time=$((test_end_time * 1000))
        test_duration=$((test_end_time - test_start_time))
        printf "${GREEN}✅ %s - PASSED (%dms)${NC}\n" "$test_name" "$test_duration"
        ((passed_tests++))
    else
        test_end_time=$(date +%s)
        test_end_time=$((test_end_time * 1000))
        test_duration=$((test_end_time - test_start_time))
        printf "${RED}❌ %s - FAILED (%dms)${NC}\n" "$test_name" "$test_duration"
        echo ""
        echo -e "${RED}🚨 Test failed - stopping execution${NC}"
        echo -e "${YELLOW}Run this specific test to debug:${NC}"
        echo -e "${GREEN}maestro test $test_file${NC}"
        echo ""
        exit 1
    fi
    echo ""
done

# Calculate total execution time
total_end_time=$(date +%s)
total_end_time=$((total_end_time * 1000))
total_duration=$((total_end_time - total_start_time))

# Print summary - if we got here, all tests passed!
echo -e "${BLUE}📊 Test Summary:${NC}"
echo -e "Total: $total_tests | ${GREEN}Passed: $passed_tests${NC}"
echo -e "${BLUE}⏱️  Total execution time: ${total_duration}ms${NC}"
echo ""
echo -e "${GREEN}🎉 All tests passed!${NC}"
exit 0
