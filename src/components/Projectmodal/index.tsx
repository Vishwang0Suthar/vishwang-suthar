"use client";

import PreviewBrowser from "@/components/browser/PreviewBrowser";

import type { PreviewType } from "@/components/browser/browser.types";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  type: PreviewType;
  url: string;
  title: string;
};

const ProjectModal = ({ isOpen, onClose, type, url, title }: Props) => {
  return (
    <PreviewBrowser
      isOpen={isOpen}
      onClose={onClose}
      type={type}
      url={url}
      title={title}
    />
  );
};

export default ProjectModal;
